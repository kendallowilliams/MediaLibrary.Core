﻿import BaseClass from "../../assets/models/base-class";
import PlayerConfiguration from "../../assets/models/configurations/player-configuration";
import HtmlControls from "../../assets/controls/html-controls";

export default class AudioVisualizer extends BaseClass {
    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private audioElement: HTMLAudioElement;
    private audioContext: AudioContext;
    private analyser: AnalyserNode;
    private dataArray: Uint8Array;
    private bufferLength: number;
    private previousDataArray: Uint8Array;
    private audioSourceNode: MediaElementAudioSourceNode;
    private fftSize: number;
    private getHeight: () => number;
    private getWidth: () => number;
    private initialized: boolean;
    private enabled: boolean;
    private drawId: number;

    constructor(private playerConfiguration: PlayerConfiguration, audioElement: HTMLAudioElement) {
        super();
        this.audioElement = audioElement as HTMLAudioElement;
        this.canvas = HtmlControls.UIControls().AudioVisualizer;
        this.getHeight = () => $(this.canvas).parent().height();
        this.getWidth = () => $(this.canvas).parent().width();
        this.canvasContext = this.canvas.getContext('2d');
        this.fftSize = 256;
        this.drawId = 0;
        this.initialized = false;
        this.enabled = false;
    }

    init(): void {
        if (this.playerConfiguration.properties.AudioVisualizerEnabled) {
            // eslint-disable-next-line
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.audioSourceNode = this.audioContext.createMediaElementSource(this.audioElement);
            this.analyser.fftSize = this.fftSize;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            this.previousDataArray = new Uint8Array(this.bufferLength);
            this.audioSourceNode.connect(this.audioContext.destination);
            this.prepareCanvas();
            this.initialized = true;
            this.enable();
        }
    }

    isInitialized(): boolean {
        return this.initialized;
    }

    clear(width, height): void {
        this.canvasContext.clearRect(0, 0, width, height);
    }

    prepareCanvas(): void {
        this.canvas.width = this.getWidth();
        this.canvas.height = this.getHeight();
        this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(id: number): void {
        let width = this.getWidth(),
            height = this.getHeight(),
            numberOfBars = 128,
            barWidth = this.canvas.width / numberOfBars,
            barHeight = 0,
            discY = 0,
            discHeight = 5,
            x = 0,
            step = Math.floor(this.bufferLength / numberOfBars),
            canContinue = this.enabled && this.drawId === id;
        
        this.clear(this.canvas.width, this.canvas.height);
        if (this.analyser) /*then*/ this.analyser.getByteFrequencyData(this.dataArray);
        this.prepareCanvas();
        for (var i = 0; i < this.previousDataArray.length && canContinue; i++) {
            if (this.dataArray[i] > this.previousDataArray[i]) {
                this.previousDataArray[i] = this.dataArray[i];
            } else if (this.previousDataArray[i] > 0) {
                this.previousDataArray[i] -= 1;
            }
        }
        for (var i = 0; i < numberOfBars && canContinue; i++) {
            barHeight = this.dataArray[i * step] * Math.floor(height / 255);
            discY = (this.previousDataArray[i * step] * Math.floor(height / 255)) + discHeight;
            this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            this.canvasContext.fillRect(x, height - barHeight, barWidth - 1, barHeight);
            this.canvasContext.fillStyle = 'white';
            this.canvasContext.fillRect(x, height - discY - 1, barWidth - 1, discHeight);
            x += barWidth;
        }

        if (!canContinue) /*then*/ this.reset.call(this);
        else window.requestAnimationFrame(this.draw.bind(this, id));
    }

    reset(): void {
        let width = this.getWidth(),
            height = this.getHeight(),
            numberOfBars = 128,
            barWidth = this.canvas.width / numberOfBars,
            barHeight = 0,
            discY = 0,
            discHeight = 5,
            x = 0,
            step = Math.floor(this.bufferLength / numberOfBars),
            canContinue = this.drawId == 0 || !this.enabled;
        
        this.clear(this.canvas.width, this.canvas.height);
        this.prepareCanvas();

        for (var i = 0; i < numberOfBars; i++) {
            barHeight = this.dataArray[i * step] * Math.floor(height / 255);
            discY = (this.previousDataArray[i * step] * Math.floor(height / 255)) + discHeight;
            if (this.dataArray[i * step] > 0) /*then*/ this.dataArray[i * step] -= 1;
            if (this.previousDataArray[i * step] > 0) /*then*/ this.previousDataArray[i * step] -= 1;

            if (barHeight > 0) {
                this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                this.canvasContext.fillRect(x, height - barHeight, barWidth - 1, barHeight);
            }

            if (discY >= discHeight) {
                this.canvasContext.fillStyle = 'white';
                this.canvasContext.fillRect(x, height - discY - 1, barWidth - 1, discHeight);
            }
            x += barWidth;
        }

        if ((this.dataArray.find((value, index) => value > 0) ||
            this.previousDataArray.find((value, index) => value > 0)) &&
            canContinue) /*then*/ window.requestAnimationFrame(this.reset.bind(this));
    }

    start(): void {
        const id: number = Date.now();

        this.drawId = id;
        if (this.enabled) /*then*/ this.draw(id);
    }

    stop(): void {
        this.drawId = 0;
    }

    enable(): void {
        if (!this.initialized) /*then*/ this.init();
        this.audioSourceNode.connect(this.analyser);
        this.enabled = true;
    }

    disable(): void {
        if (!this.isInitialized) /*then*/ this.init();
        this.audioSourceNode.disconnect(this.analyser);
        this.enabled = false;
    }
}