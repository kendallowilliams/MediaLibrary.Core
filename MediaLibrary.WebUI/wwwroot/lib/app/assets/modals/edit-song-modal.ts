import HtmlControls from '../controls/html-controls';
import LoadingModal from '../modals/loading-modal';
import MediaLibraryConfiguration from '../models/configurations/media-library-configuration';
import { MediaPages, MessageBoxConfirmType } from '../enums/enums';
import { fetch_get, fetch_post } from '../utilities/fetch_service';
import { Modal } from 'bootstrap';
import { MlCallback } from '../types/callback.type';
import { MediaData } from '../models/music.model';
import * as MessageBox from '../utilities/message-box';

export default class EditSongModal {
    private modal: HTMLElement;

    constructor(private mediaLibraryConfiguration: MediaLibraryConfiguration, private loadFunc: MlCallback<MediaPages> = () => null) {
        this.modal = HtmlControls.Modals().EditSongModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        $(this.modal).on('show.bs.modal', e => {
            const id = $(e["relatedTarget"]).attr('data-item-id'),
                success = data => {
                    this.clearEditSongModal();
                    $('#txtEditSongTitle').text(data.Title || 'Song')
                    $('#txtEditId').val(data.Id);
                    $('#txtEditTitle').val(data.Title);
                    $('#txtEditAlbum').val(data.Album);
                    $('#txtEditArtist').val(data.Artist);
                    $('#txtEditGenre').val(data.Genre);
                    $('#txtEditPosition').val(data.Position);
                };

            fetch_get('Music/GetSong', { id: id })
                .then(response => response.json())
                .then(json => success(json));
        });

        $('[data-song-action="save"]').on('click', e => {
            const formData = new FormData(),
                bsModal = Modal.getOrCreateInstance(this.modal);

            formData.set('Id', $('#txtEditId').val() as string);
            formData.set('Title', $('#txtEditTitle').val() as string);
            formData.set('Album', $('#txtEditAlbum').val() as string);
            formData.set('Artist', $('#txtEditArtist').val() as string);
            formData.set('Genre', $('#txtEditGenre').val() as string);
            formData.set('Position', $('#txtEditPosition').val() as string);

            $(this.modal).on('hidden.bs.modal', () => {
                LoadingModal.showLoading();
                fetch_post('Music/UpdateSong', formData)
                    .then(_ => this.loadFunc(this.mediaLibraryConfiguration.properties.SelectedMediaPage));
            });
            bsModal.hide();
        });
        $('[data-song-action="import"]').on('click', e => {
            LoadingModal.showLoading();
            fetch_get('Music/GetMediaData', { id: $('#txtEditId').val() as string })
                .then(response => response.json())
                .then((data: MediaData) => {
                    $('#txtEditTitle').val(data.Title);
                    $('#txtEditAlbum').val(data.Album);
                    $('#txtEditArtist').val(data.Artists);
                    $('#txtEditGenre').val(data.Genres);
                    $('#txtEditPosition').val(data.Track);
                    LoadingModal.hideLoading();
                });
        });
        $('[data-song-action="export"]').on('click', e => {
            const formData = new FormData();

            formData.set('Id', $('#txtEditId').val() as string);
            formData.set('Title', $('#txtEditTitle').val() as string);
            formData.set('Album', $('#txtEditAlbum').val() as string);
            formData.set('Artist', $('#txtEditArtist').val() as string);
            formData.set('Genre', $('#txtEditGenre').val() as string);
            formData.set('Position', $('#txtEditPosition').val() as string);

            MessageBox.confirm(
                'Export To File',
                'Are you sure you want to save this data to the file?',
                MessageBoxConfirmType.YesNo,
                () => {
                    LoadingModal.showLoading();
                    fetch_post('Music/UpdateTag', formData).then(_ => LoadingModal.hideLoading());
                }
            );
        });
    }

    private clearEditSongModal(): void {
        $('#txtEditSongTitle').text('Song')
        $('#txtEditId').val();
        $('#txtEditTitle').val();
        $('#txtEditAlbum').val();
        $('#txtEditArtist').val();
        $('#txtEditGenre').val();
    }
}
