﻿CREATE PROCEDURE [dbo].[spAddDefaultSeries]
AS

DECLARE @BewitchedId int,
		@GoldenGirlsId int,
		@MamasFamilyId int,
		@RoseanneId int,
		@StrangersWithCandyId int,
		@WonderWomanId int,
		@XenaId int,
		@StarTrekTASId int,
		@StarTrekTOSId int,
		@DuckmanId int,
		@WhatsHappening int,
		@BewitchedPath VARCHAR(256) = N'BEWITCHED',
		@GoldenGirlsPath VARCHAR(256) = N'GOLDEN_GIRLS',
		@MamasFamilyPath VARCHAR(256) = N'MAMAS_FAMILY',
		@RoseannePath VARCHAR(256) = N'ROSEANNE',
		@StrangersWithCandyPath VARCHAR(256) = N'STRANGERS_WITH_CANDY',
		@WonderWomanPath VARCHAR(256) = N'WONDER_WOMAN',
		@XenaPath VARCHAR(256) = N'XENA',
		@StarTrekTASPath VARCHAR(256) = N'STAR_TREK_TAS',
		@StarTrekTOSPath VARCHAR(256) = N'STAR_TREK_TOS',
		@DuckmanPath VARCHAR(256) = N'DUCKMAN',
		@WhatsHappeningPath VARCHAR(256) = N'WHATS_HAPPENING';

DELETE Series;

BEGIN
	INSERT INTO Series ([Title]) VALUES ('Bewitched');
	INSERT INTO Series ([Title]) VALUES ('Golden Girls');
	INSERT INTO Series ([Title]) VALUES ('Mama''s Family');
	INSERT INTO Series ([Title]) VALUES ('Roseanne');
	INSERT INTO Series ([Title]) VALUES ('Strangers With Candy');
	INSERT INTO Series ([Title]) VALUES ('Wonder Woman');
	INSERT INTO Series ([Title]) VALUES ('Xena: Warrior Princess');
	INSERT INTO Series ([Title]) VALUES ('Star Trek: The Animated Series');
	INSERT INTO Series ([Title]) VALUES ('Star Trek: The Original Series');
	INSERT INTO Series ([Title]) VALUES ('Duckman');
	INSERT INTO Series ([Title]) VALUES ('What''s Happening!!');
END

SELECT @BewitchedId = Id FROM Series WHERE Title = 'Bewitched';
SELECT @GoldenGirlsId = Id FROM Series WHERE Title = 'Golden Girls';
SELECT @MamasFamilyId = Id FROM Series WHERE Title = 'Mama''s Family';
SELECT @RoseanneId = Id FROM Series WHERE Title = 'Roseanne';
SELECT @StrangersWithCandyId = Id FROM Series WHERE Title = 'Strangers With Candy';
SELECT @WonderWomanId = Id FROM Series WHERE Title = 'Wonder Woman';
SELECT @XenaId = Id FROM Series WHERE Title = 'Xena: Warrior Princess';
SELECT @StarTrekTASId = Id FROM Series WHERE Title = 'Star Trek: The Animated Series';
SELECT @StarTrekTOSId = Id FROM Series WHERE Title = 'Star Trek: The Original Series';
SELECT @DuckmanId = Id FROM Series WHERE Title = 'Duckman';
SELECT @WhatsHappening = Id FROM Series WHERE Title = 'What''s Happening!!';

/* ROSEANNE */
BEGIN
	/*ROSEANNE SEASON ONE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Life and Stuff',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('We''re in the Money',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('D-I-V-O-R-C-E',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Language Lessons',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Radio Days',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lovers'' Lane',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Memory Game',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Here''s to Good Friends',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dan''s Birthday Bash',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Saturday',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Canoga Time',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Monday Thru Friday Show',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bridge Over Troubled Sonny',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Father''s Day',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nightmare on Oak Street',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mall Story',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Becky''s Choice',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Slice of Life',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Workin'' Overtime',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Toto, We''re Not in Kansas Anymore',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Death and Stuff',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dear Mom and Dad',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Let''s Call It Quits',@RoseanneId,1,CONCAT(@RoseannePath,'/S1','/23.mp4'));
	/*ROSEANNE SEASON TWO*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Inherit the Wind',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Little Sister',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Guilt by Disassociation',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Somebody Stole My Gal',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('House of Grown-Ups',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Five of a Kind',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('BOO!',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sweet Dreams',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('We Gather Together',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Brain-Dead Poets Society',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lobocop',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('No Talking',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Chicken Hearts',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One for the Road',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('An Officer and a Gentleman',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Born to Be Wild',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hair',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I''m Hungry',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('All of Me',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Tell the Truth',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fender Bender',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('April Fool''s Day',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fathers and Daughters',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Happy Birthday',@RoseanneId,2,CONCAT(@RoseannePath,'/S2','/24.mp4'));
	/*ROSEANNE SEASON THREE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Test',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Friends & Relatives',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Like a Virgin',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Like a New Job',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Goodbye Mr. Right',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Becky, Beds & Boys',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Trick or Treat',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('PMS, I Love You',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bird is the Word',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dream Lover',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Do You Know Where Your Parents Are?',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Confessions',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Courtship of Eddie, Dan''s Father',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Wedding',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Becky Doesn''t Live Here Anymore',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Home-Ec',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Valentine''s Day',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Communicable Theater',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vegas Interruptus',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Her Boyfriend''s Back',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Troubles with the Rubbles',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Second Time Around',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dances with Darlene',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Scenes from a Barbecue',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Pied Piper of Lanford',@RoseanneId,3,CONCAT(@RoseannePath,'/S3','/25.mp4'));
	/*ROSEANNE SEASON FOUR*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Bitter Pill to Swallow',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Take My Bike...Please!',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Why Jackie Become a Trucker!',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Darlene Fades to Black',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tolerate Thy Neighbor',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Trick Me Up, Trick Me Down',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vegas',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vegas, Vegas',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Stressed to Kill',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Thanksgiving ''91',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Kansas City, Here We Come',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Santa Claus',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bingo',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Bowling Show',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Back Story',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Less is More',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Breaking Up is Hard to Do',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('This Old House',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Commercial Show',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Therapy',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lies',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Deliverance',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Secrets',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Don''t Make Me Over',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Aliens',@RoseanneId,4,CONCAT(@RoseannePath,'/S4','/25.mp4'));
	/*ROSEANNE SEASON FIVE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Terms of Estrangement: Part 1',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Terms of Estrangement: Part 2',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Dark Ages',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mommy Nearest',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pretty in Black',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Looking for Loans in All the Wrong Places',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Halloween IV',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ladies'' Choice',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Stand on Your Man',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Good Girls, Bad Girls',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Of Ice and Men',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('No Place Like Home for the Holidays',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Crime and Punishment',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('War and Peace',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lanforn Daze',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wait Till Your Father Gets Home',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('First Cousin, Twice Removed',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lose a Job, Winnebago',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s a Boy!',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It Was Twenty Years Ago Today',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Playing with Matches',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Promises, Promises',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Glengarry, Glen Rosey',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tooth of Consequences',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Daughters and Other Strangers',@RoseanneId,5,CONCAT(@RoseannePath,'/S5','/25.mp4'));
	/*ROSEANNE SEASON SIX*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Two Down, One to Go',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Mommy''s Curse',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Party Politics',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Stash from the Past',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Be My Baby',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Halloween V',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Homeward Bound',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Guilt by Imagination',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Homecoming',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Thanksgiving ''93',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Driver''s Seat',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('White Trash Christmas',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Suck Up or Shut Up',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Busted',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('David vs. Goliath',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Everyone Comes to Jackie''s',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Don''t Make Room for Daddy',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Don''t Ask, Don''t Tell',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Labor Day',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Past Imperfect',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lies My Father Told Me',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Pray the Lord My Stove to Keep',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Body by Jake',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Isn''t it Romantic?',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Altar Egos',@RoseanneId,6,CONCAT(@RoseannePath,'/S6','/25.mp4'));
	/*ROSEANNE SEASON SEVEN*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nine is Enough',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Two for One',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Snoop Davey Dave',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Girl Talk',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sleeper',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Skeleton in the Closet',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Follow the Son',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Punch and Jimmy',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('White Men Can''t Kiss',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Thanksgiving ''94',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Maybe Baby',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Parenting Trap',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rear Window',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My name is Bev',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bed and Bored',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sisters',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lost Youth',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Single Married Female',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('All About Rosey',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Husbands and Wives',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Happy Trailers',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Blaming of the Shrew',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('the Birds and the Frozen Bees',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Couch Potatoes',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sherwood Schwartz: A Loving Tribute',@RoseanneId,7,CONCAT(@RoseannePath,'/S7','/25.mp4'));
	/*ROSEANNE SEASON EIGHT*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shower the People You Love with Stuff',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Let Them Eat Junk',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Roseanne in the Hood',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Last Date',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Halloween: the Final Chapter',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Fifties Show',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Getaway, Almost',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Last Thursday in November',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Of Mice and Dan',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Direct to Video',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('December Bride',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Thrilla Near the Vanilla Extract',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The White Sheep of the Family',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Becky Howser, M.D.',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Out of the Past',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Construction Junction',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('We''re Going to Disney World',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Disney World War II',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Springtime for David',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Another Mouth to Shut Up',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Morning Become Obnoxious',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ballroom Blitz',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Wedding',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Heart & Soul',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fights and Stuff',@RoseanneId,8,CONCAT(@RoseannePath,'/S8','/25.mp4'));
	/*ROSEANNE SEASON NINE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Call Waiting',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Millions from Heaven',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What a Day for a Daydream',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Honor Thy Mother',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Someday My Prince Will Come',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pampered to a Pulp',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Satan, Darling',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hoi Polloi Meets Hoiti Toiti',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Roseambo',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Home is Where the Afghan Is',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mothers and Other Strangers',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Home for the Holidays',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Say It Ain''t So',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hit the Road, Jack',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The War Room',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lanford''s Elite',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Some Echanted Merger',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Second Chance',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Miracle',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Roseanne-Feld',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Truth Be Told',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Arsenic and Old Mom',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Into The Good Night: Part 1',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Into The Good Night: Part 2',@RoseanneId,9,CONCAT(@RoseannePath,'/S9','/24.mp4'));
END

/* STRANGERS WITH CANDY */
BEGIN
	/*STRANGERS WITH CANDY SEASON ONE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Old Habits, New Beginnings',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Burden''s Burden',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dreams on the Rocks',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Who Wants Cake?',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bogie Nights',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Let Freedom Ring',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Feather in the Storm',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Be Young, Gifted, and Blank',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Jerri is Only Skin Deep',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Trip Back',@StrangersWithCandyId,1,CONCAT(@StrangersWithCandyPath,'/S1','/10.mp4'));
	/*STRANGERS WITH CANDY SEASON TWO*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Yes, You Can''t',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Behind Blank Eyes',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Virgin Jerri',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Goodbye Guy',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hit and Run',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Blank Page',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Love, Honor, and Pretend',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blank Stare: Part 1',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blank Stare: Part 2',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Price Too High for Riches',@StrangersWithCandyId,2,CONCAT(@StrangersWithCandyPath,'/S2','/10.mp4'));
	/*STRANGERS WITH CANDY SEASON THREE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Jerri''s Burning Issue',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Is Freedom Free?',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Trail of Tears',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Is My Daddy Crazy?',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blank Relay',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Invisible Love',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ask Jerri',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There Once Was a Blank from Nantucket',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bully',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Last Temptation of Blank',@StrangersWithCandyId,3,CONCAT(@StrangersWithCandyPath,'/S3','/10.mp4'));
END

/* THE GOLDEN GIRLS */
BEGIN
	/*THE GOLDEN GIRLS SEASON ONE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Engagement',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Guess Who''s Coming to the Wedding?',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rose the Prude',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Transplant',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Triangle',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('On Golden Girls',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Competition',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Break-In',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blanche and The Younger Man',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Heart Attack',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Return of Dorothy''s Ex/Stan''s Return',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Custody Battle',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Little Romance',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('That Was No Lady',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('In a Bed of Rose''s',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Truth Will Out/The Will',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nice and Easy',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Operation',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Second Motherhood',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Adult Education',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Flu Attack/The Flu',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Job Hunting',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blind Ambitions',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Big Daddy',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Way We Met',@GoldenGirlsId,1,CONCAT(@GoldenGirlsPath,'/S1','/25.mp4'));
	/*GOLDEN GIRLS SEASON TWO*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('End of the Curse',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ladies of the Evening',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Take Him, He''s Mine',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s a Miserable Life',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Isn''t It Romantic?',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Big Daddy''s Little Lady',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Family Affair',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vacation',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Joust Between Friends',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Love, Rose',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('''Twas the Nightmare Before Christmas',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Sisters',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Stan Who Came to Dinner',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Action',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Before and After',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('And Then There Was One',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bedtime Story',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Forgive Me, Father',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Long Day''s Journey into Marinara',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Whose Face Is This, Anyway?',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dorothy''s Prized Pupil',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Diamond in the Rough',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Son-in-Law Dearest',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Catch a Neighbor',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Piece of Cake',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Empty Nests',@GoldenGirlsId,2,CONCAT(@GoldenGirlsPath,'/S2','/26.mp4'));
	/*GOLDEN GIRLS SEASON THREE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Old Friends',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One for the Money',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bringing Up Baby',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Housekeeper',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nothing to Fear But Fear Itself',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Letter to Gorbachev',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Strange Bedfellows',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Brotherly Love',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Visit from Little Sven',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Audit',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Three on a Couch',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Charlie''s Buddy',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Artist',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blanche''s Little Girl',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dorothy''s New Friend',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Grab That Dough',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Brother, My Father',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Golden Moments',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('And Ma Makes Three',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Larceny and Old Lace',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rose''s Big Adventure',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mixed Blessings',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mister Terrific',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mother''s Day',@GoldenGirlsId,3,CONCAT(@GoldenGirlsPath,'/S3','/24.mp4'));
	/*GOLDEN GIRLS SEASON FOUR*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Yes, We Have No Havanas',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Days and Nights of Sophia Petrillo',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The One That Got Away',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Yokel Hero',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bang the Drum, Stanley',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sophia''s Wedding: Part 1/2',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Brother, Can You Spare That Jacket?',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Scared Straight',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Stan Takes a Wife',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Auction',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blind Date',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Impotence of Being Ernest',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Love Me Tender',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Valentine''s Day',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Two Rode Together',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('You Gotta Have Hope',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fiddler of the Ropes',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Till Death Do We Volley',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('High Anxiety',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Little Sister',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sophia''s Choice',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rites of Spring',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Foreign Exchange',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('We''re Outta Here',@GoldenGirlsId,4,CONCAT(@GoldenGirlsPath,'/S4','/24.mp4'));
	/*GOLDEN GIRLS SEASON FIVE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sick and Tired: Part 1',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sick and Tired: Part 2',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Accurate Conception',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rose Fights Back',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Love Under the Big Top',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dancing in the Dark',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Not Another Monday',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('That Old Feeling',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Comedy of Errors',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('All That Jazz',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ebb Tide',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Have Yourself a Very Little Christmas',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mary Has a Little Lamb',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Great Expectations',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Triple Play',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Clinton Avenue Memoirs',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Like the Beep Beep Beep of the Tom-Tom',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('An Illegitimate Concern',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('72 Hours',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Twice in a Lifetime',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sisters and Other Strangers',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cheaters',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Mangiacavallo Curse Makes a Lousy Wedding Present to Us',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('All Bets Off',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The President''s Coming! The President''s Coming!',@GoldenGirlsId,5,CONCAT(@GoldenGirlsPath,'/S5','/25.mp4'));
	/*GOLDEN GIRLS SEASON SIX*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blanche Delivers',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Once, in St. Olaf',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('If at Last You Do Succeed',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Snap Out of It',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wham, Bam, Thank You, Mammy',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Feelings',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Zborn Again',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How Do You Solve a Problem Like Sophia?',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mrs. George Devereaux',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Girls Just Wanna have Fun...Before They Die',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Stand by Your Man',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ebbtide''s Revenge',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Bloom Is Off the Rose',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sister of the Bride',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Miles to Go',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There Goes the Bride: Part 1',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There Goes the Bride: Part 2',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Older and Wiser',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Melodrama',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Even Grandmas Get the Blues',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Witness',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What Difference a Date Makes',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Love for Sale',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Never Yell Fire in a Crowded Retirement Home: Part 1/2',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Henny Penny-Straight, No Chaser',@GoldenGirlsId,6,CONCAT(@GoldenGirlsPath,'/S6','/25.mp4'));
	/*GOLDEN GIRLS SEASON SEVEN*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hey, Look Me Over',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Case of the Libertine Belle',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Beauty and the Beast',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('That''s for Me to Know',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Where''s Charlie',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mother Load',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dateline: Miami',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Monkey Show',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ro$e Love$ Mile$',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Room 7',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('From Here to Pharmacy',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Pope''s Ring',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Old Boyfriends',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Goodbye, Mr. Gordon',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Commitments',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Questions and Answers',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ebbtide VI: the Wrath of Stan',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Journey to the Center of Attention',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Midwinter Night''s Dream',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rose: Portrait of a Woman',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Home Again, Rose: Part 1',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Home Again, Rose: Part 2',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One Flew Out of the Cuckoo''s Nest',@GoldenGirlsId,7,CONCAT(@GoldenGirlsPath,'/S7','/23.mp4'));
END

/* BEWITCHED */
BEGIN
	/*BEWITCHED SEASON ONE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Darrin, Take This Witch, Samantha',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Be It Ever So Mortgaged',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mother, Meet What''s His Name?',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It Shouldn''t Happen to a Dog',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Help, Help, Don''t Save Me',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Little Pitchers Have Big Fears',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Witches Are Out',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Girl Reporter',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Witch or Wife',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Just One of the Family',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It Takes One to Know One',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('...And Something Makes Three',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Love is Blind',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha Meets the Folks',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Vision of Sugar Plums',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s Magic',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A is for Aardvark',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Cat''s Meow',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Nice Little Dinner Party',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Your Witch is Showing',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ling Ling',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Eye of the Beholder',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Red Light, Green Light',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Which Witch is Which?',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pleasure O''Riley',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Driving is the Only Way to Fly',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There''s No Witch Like an Old Witch',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Open the Door, Witchcraft',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Adner Kadabra',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('George the Warlock',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/30.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('That Was My Wife',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/31.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Illegal Separation',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/32.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Change of Face',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/33.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Remember the Main',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/34.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Eat at Mario''s',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/35.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cousin Edgar',@BewitchedId,1,CONCAT(@BewitchedPath,'/S1','/36.mp4'));
	/*BEWITCHED SEASON TWO*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Alias Darrin Stephens',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Very Special Delivery',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('We''re in for a Bad Spell',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Grandson, the Warlock',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Joker is a Card',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Take Two Aspirins and Half a Pint of Porpoise Milk',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Trick or Treat',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Very Informal Dress',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('And Then I Wrote',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Junior Executive',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Aunt Clara''s Old Flame',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Strange Little Visitor',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Boss the Teddy Bear',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Speak the Truth',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Vision of Sugarplums',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Magic Cabin',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Maid to Order',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('And Then There Were Three',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Baby the Tycoon',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha Meets the Folks',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fastest Gun on Madison Avenue',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Dancing Bear',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Double Tate',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha the Dressmaker',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Horse''s Mouth',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Baby''s First Paragraph',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Leprechaun',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Double Split',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Disappearing Samantha',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Follow that Witch: Part 1',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/30.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Follow that Witch: Part 2',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/31.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Burn Raps',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/32.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Divided He Falls',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/33.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Man''s Best Friend',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/34.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Catnapper',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/35.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What Every Young Man Should Know',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/36.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Girl with the Golden Nose',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/37.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Prodigy',@BewitchedId,2,CONCAT(@BewitchedPath,'/S2','/38.mp4'));
	/*BEWITCHED SEASON THREE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nobody''s Perfect',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Moment of Truth',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Witches and Warlocks are My Favorite Things',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Accidental Twins',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Most Unusual Wood Nymph',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Endora Moves in For a Spell',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Twitch or Treat',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dangerous Diaper Dan',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Short, Happy Circuit of Aunt Clara',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I''d Rather Twitch Than Fight',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Oedipus Hex',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sam''s Spooky Chair',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Friend Ben',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha for the Defense',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Gazebo Never Forgets',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Soapbox Derby',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sam in the Moon',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ho Ho, the Clown',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Super Car',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Corn is as High as a Guernsey''s Eye',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Trial and Error of Aunt Clara',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Three Wishes',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Remember You...Sometimes',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Art for Sam''s Sake',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Charlie Harper, Winner',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Aunt Clara''s Victoria Victory',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Crone of Cawdor',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('No More Mr. Nice Guy',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s Wishcraft',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How to Fail in Business With All Kinds of Help',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/30.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bewitched, Bothered and Infuriated',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/31.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nobody But a Frog Knows How to Live',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/32.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There''s Gold in Them Thar Pills',@BewitchedId,3,CONCAT(@BewitchedPath,'/S3','/33.mp4'));
	/*BEWITCHED SEASON FOUR*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Long Live the Queen',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Toys in Babeland',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Business, Italian Style',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Double, Double, Toil and Trouble',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cheap, Cheap',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('No Zip in My Zap',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Birdies, Bogies, and Baxter',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Safe and Sane Halloween',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Out of Sync, Out of Mind',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('That Was No Chick, That Was My Wife',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Allergic to Macedonian Dodo Birds',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Thanksgiving to Remember',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Solid Gold Mother-in-Law',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My, What Big Ears You Have',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Get Your Nanny, You Get My Goat',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Humbug Not to Be Spoken Here',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Da Vinci Dilemma',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Once in a Vial',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Snob in the Grass (1)',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('If They Never Met (2)',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hippie, Hippie, Hooray',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Prince of a Guy',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('McTavish',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How Green Was My Grass',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Twitch or Not to Twitch',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Playmates',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tabitha''s Cranky Spell',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Confess',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Majority of Two',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Secret Saucer',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/30.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The No-Harm Charm',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/31.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Man of the Year',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/32.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Splitsville',@BewitchedId,4,CONCAT(@BewitchedPath,'/S4','/33.mp4'));
	/*BEWITCHED SEASON FIVE*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Wedding Present',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha Goes South for a Spell',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha on the Keyboard',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Darrin, Gone and Forgotten',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s So Nice to Have a Spouse Around the House',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mirror, Mirror on the Wall',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s French Pastry',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Is it Magic or Imagination?',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha Fights City Hall',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha Loses Her Voice',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Don''t Want to Be a Toad, I Want to Be a Butterfly',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Weep No More My Willow',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Instant Courtesy',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Super Maid',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Serena Strikes Again (1)',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Serena Strikes Again (2)',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One Touch of Midas',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha the Bard',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha the Sculptress',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mrs. Stephens, Where are You?',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Marriage, Witches'' Style',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Going Ape',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tabitha''s Weekend',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Battle of Burning Oak',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Power Failure',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha Twitches for UNICEF',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Daddy Does His Thing',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Good News',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Shopping Spree',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha and Darrin in Mexico City',@BewitchedId,5,CONCAT(@BewitchedPath,'/S5','/30.mp4'));
	/*BEWITCHED SEASON SIX*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha and the Beanstalk',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Yoo-Hoo Maid',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Caesar Salad',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Curious Cravings',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('...And Something Makes Four',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Naming Samantha''s New Baby',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Trick or Treat or Not to Trick or Treat',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Bunny for Tabitha',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Secret Spell',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Daddy Comes for a Visit (1)',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Darrin the Warlock (2)',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sam''s Double Mother Trouble',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('You''re So Agreeable',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Santa Comes to Visit and Stays and Stays',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Better Halves',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Lost Weekend',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Phrase is Familiar',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Secret is Discovered',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tabitha''s Very Own Samantha',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Super Arthur',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What Makes Darrin Run?',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Serena Stops the Show',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Just a Kid Again',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Generation Zap',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Okay, Who''s the Wise Witch?',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Chance on Love',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('If the Shoe Pinches',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mona Sammi',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Turn on the Old Charm',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Make Love, Not Hate',@BewitchedId,6,CONCAT(@BewitchedPath,'/S6','/30.mp4'));
	/*BEWITCHED SEASON SEVEN*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Go or Not to Go, That is the Question (1)',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Salem, Here We Come (2)',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Salem Saga (1)',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Hot Bed Warmer (2)',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Darrin on a Pedistal',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Paul Revere Rides Again',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Bad Day in Salem',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Old Salem Trip',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Pet Warlock',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Old Man',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Corsican Cousins',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Magic Potion',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sisters at Heart',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mother-in-Law of the Year',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mary the Good Fairy',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Good Fairy Strikes Again',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Return of Darrin the Bold',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The House that Uncle Arthur Built',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha and the Troll',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('This Little Piggie',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mixed Doubles',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Darrin Goes Ape',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Money Happy Returns',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Out of the Mouths of Babes',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sam''s Psychic Slip',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Magic Mirror',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Laugh, Clown, Laugh',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha and the Antique Doll',@BewitchedId,7,CONCAT(@BewitchedPath,'/S7','/28.mp4'));
	/*BEWITCHED SEASON EIGHT*/
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How Not to Lose Your Head to King Henry VIII (1)',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How Not to Lose Your Head to King Henry VIII (2)',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha and the Loch Ness Monster',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Not-So-Leaning Tower of Pisa',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bewitched, Bothered, and Baldoni',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Paris, Witches'' Style',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Ghost Who Made a Spectre of Himself',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('TV or Not TV',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Plague on Maurice and Samantha',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hansel and Gretel in Samanthaland',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Warlock in the Gray Flannel Suit',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Eight-Year Witch',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Three Men and a Witch on a Horse',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Adam, Warlock or Washout?',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Magic Sitter',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha is Earthbound',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Serena''s Richcraft',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha on Thin Ice',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Serena''s Youth Pill',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tabitha''s First Day at School',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('George Washington Zapped Here (1)',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('George Washington Zapped Here (2)',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('School Days, School Daze',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Good Turn Never Goes Unpunished',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Samantha''s Witchcraft Blows a Fuse',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Truth, Nothing But the Truth, So Help Me Sam',@BewitchedId,8,CONCAT(@BewitchedPath,'/S8','/26.mp4'));
END

/* XENA: Warrior Princess */
BEGIN
	/* XENA SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sins of the Past',@XenaId,1,CONCAT(@XenaPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Chariots of War',@XenaId,1,CONCAT(@XenaPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dreamworker',@XenaId,1,CONCAT(@XenaPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cradle of Hope',@XenaId,1,CONCAT(@XenaPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Path Not Taken',@XenaId,1,CONCAT(@XenaPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Reckoning',@XenaId,1,CONCAT(@XenaPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Titans',@XenaId,1,CONCAT(@XenaPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Prometheus',@XenaId,1,CONCAT(@XenaPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Death in Chains',@XenaId,1,CONCAT(@XenaPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hooves and Harlots',@XenaId,1,CONCAT(@XenaPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Black Wolf',@XenaId,1,CONCAT(@XenaPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Beware Greeks Bearing Gifts',@XenaId,1,CONCAT(@XenaPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Athens City Academy of the Performing Bards',@XenaId,1,CONCAT(@XenaPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Fistful of Dinars',@XenaId,1,CONCAT(@XenaPath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Warrior... Princess',@XenaId,1,CONCAT(@XenaPath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mortal Beloved',@XenaId,1,CONCAT(@XenaPath,'/S1','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Royal Couple of Thieves',@XenaId,1,CONCAT(@XenaPath,'/S1','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Prodigal',@XenaId,1,CONCAT(@XenaPath,'/S1','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Altared States',@XenaId,1,CONCAT(@XenaPath,'/S1','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ties That Bind',@XenaId,1,CONCAT(@XenaPath,'/S1','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Greater Good',@XenaId,1,CONCAT(@XenaPath,'/S1','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Callisto',@XenaId,1,CONCAT(@XenaPath,'/S1','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Death Mask',@XenaId,1,CONCAT(@XenaPath,'/S1','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Is There a Doctor in the House?',@XenaId,1,CONCAT(@XenaPath,'/S1','/24.mp4'));
	/* XENA SEASON TWO */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Orphan of War',@XenaId,2,CONCAT(@XenaPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Remember Nothing',@XenaId,2,CONCAT(@XenaPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Giant Killer',@XenaId,2,CONCAT(@XenaPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Girls Just Wanna Have Fun',@XenaId,2,CONCAT(@XenaPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Return of Callisto',@XenaId,2,CONCAT(@XenaPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Warrior... Princess... Tramp',@XenaId,2,CONCAT(@XenaPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Intimate Stranger',@XenaId,2,CONCAT(@XenaPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ten Little Warlords',@XenaId,2,CONCAT(@XenaPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Solstice Carol',@XenaId,2,CONCAT(@XenaPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Xena Scrolls',@XenaId,2,CONCAT(@XenaPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Here She Comes... Miss Amphipolis',@XenaId,2,CONCAT(@XenaPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Destiny',@XenaId,2,CONCAT(@XenaPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Quest',@XenaId,2,CONCAT(@XenaPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Necessary Evil',@XenaId,2,CONCAT(@XenaPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Day in the Life',@XenaId,2,CONCAT(@XenaPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('For Him the Bell Tolls',@XenaId,2,CONCAT(@XenaPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Execution',@XenaId,2,CONCAT(@XenaPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Blind Faith',@XenaId,2,CONCAT(@XenaPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ulysses',@XenaId,2,CONCAT(@XenaPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Price',@XenaId,2,CONCAT(@XenaPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lost Mariner',@XenaId,2,CONCAT(@XenaPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Comedy of Eros',@XenaId,2,CONCAT(@XenaPath,'/S2','/22.mp4'));
	/* XENA SEASON THREE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Furies',@XenaId,3,CONCAT(@XenaPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Been There, Done That',@XenaId,3,CONCAT(@XenaPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Dirty Half Dozen',@XenaId,3,CONCAT(@XenaPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Deliverer',@XenaId,3,CONCAT(@XenaPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Gabrielle''s Hope',@XenaId,3,CONCAT(@XenaPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Debt, Part 1',@XenaId,3,CONCAT(@XenaPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Debt, Part 2',@XenaId,3,CONCAT(@XenaPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The King of Assassins',@XenaId,3,CONCAT(@XenaPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Warrior... Priestess... Tramp',@XenaId,3,CONCAT(@XenaPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Quill Is Mightier...',@XenaId,3,CONCAT(@XenaPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Maternal Instincts',@XenaId,3,CONCAT(@XenaPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Bitter Suite',@XenaId,3,CONCAT(@XenaPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One Against an Army',@XenaId,3,CONCAT(@XenaPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Forgiven',@XenaId,3,CONCAT(@XenaPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('King Con',@XenaId,3,CONCAT(@XenaPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('When in Rome...',@XenaId,3,CONCAT(@XenaPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Forget Me Not',@XenaId,3,CONCAT(@XenaPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fins, Femmes and Gems',@XenaId,3,CONCAT(@XenaPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tsunami',@XenaId,3,CONCAT(@XenaPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vanishing Act',@XenaId,3,CONCAT(@XenaPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sacrifice, Part 1',@XenaId,3,CONCAT(@XenaPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sacrifice, Part 2',@XenaId,3,CONCAT(@XenaPath,'/S3','/22.mp4'));
	/* XENA SEASON FOUR */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Adventures in the Sin Trade, Part 1',@XenaId,4,CONCAT(@XenaPath,'/S4','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Adventures in the Sin Trade, Part 2',@XenaId,4,CONCAT(@XenaPath,'/S4','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Family Affair',@XenaId,4,CONCAT(@XenaPath,'/S4','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('In Sickness and in Hell',@XenaId,4,CONCAT(@XenaPath,'/S4','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Good Day',@XenaId,4,CONCAT(@XenaPath,'/S4','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Tale of Two Muses',@XenaId,4,CONCAT(@XenaPath,'/S4','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Locked Up and Tied Down',@XenaId,4,CONCAT(@XenaPath,'/S4','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Crusader',@XenaId,4,CONCAT(@XenaPath,'/S4','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Past Imperfect',@XenaId,4,CONCAT(@XenaPath,'/S4','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Key to the Kingdom',@XenaId,4,CONCAT(@XenaPath,'/S4','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Daughter of Pomira',@XenaId,4,CONCAT(@XenaPath,'/S4','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('If the Shoe Fits...',@XenaId,4,CONCAT(@XenaPath,'/S4','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Paradise Found',@XenaId,4,CONCAT(@XenaPath,'/S4','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Devi',@XenaId,4,CONCAT(@XenaPath,'/S4','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Between the Lines',@XenaId,4,CONCAT(@XenaPath,'/S4','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Way',@XenaId,4,CONCAT(@XenaPath,'/S4','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Play''s the Thing',@XenaId,4,CONCAT(@XenaPath,'/S4','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Convert',@XenaId,4,CONCAT(@XenaPath,'/S4','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Takes One to Know One',@XenaId,4,CONCAT(@XenaPath,'/S4','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Endgame',@XenaId,4,CONCAT(@XenaPath,'/S4','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Ides of March',@XenaId,4,CONCAT(@XenaPath,'/S4','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Deja Vu All over Again',@XenaId,4,CONCAT(@XenaPath,'/S4','/22.mp4'));
	/* XENA SEASON FIVE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fallen Angel',@XenaId,5,CONCAT(@XenaPath,'/S5','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Chakram',@XenaId,5,CONCAT(@XenaPath,'/S5','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Succession',@XenaId,5,CONCAT(@XenaPath,'/S5','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Animal Attraction',@XenaId,5,CONCAT(@XenaPath,'/S5','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Them Bones, Them Bones',@XenaId,5,CONCAT(@XenaPath,'/S5','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Purity',@XenaId,5,CONCAT(@XenaPath,'/S5','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Back in the Bottle',@XenaId,5,CONCAT(@XenaPath,'/S5','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Little Problems',@XenaId,5,CONCAT(@XenaPath,'/S5','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Seeds of Faith',@XenaId,5,CONCAT(@XenaPath,'/S5','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lyre, Lyre, Hearts on Fire',@XenaId,5,CONCAT(@XenaPath,'/S5','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Punch Lines',@XenaId,5,CONCAT(@XenaPath,'/S5','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('God Fearing Child',@XenaId,5,CONCAT(@XenaPath,'/S5','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Eternal Bonds',@XenaId,5,CONCAT(@XenaPath,'/S5','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Amphipolis under Siege',@XenaId,5,CONCAT(@XenaPath,'/S5','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Married with Fishsticks',@XenaId,5,CONCAT(@XenaPath,'/S5','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Lifeblood',@XenaId,5,CONCAT(@XenaPath,'/S5','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Kindred Spirits',@XenaId,5,CONCAT(@XenaPath,'/S5','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Antony and Cleopatra',@XenaId,5,CONCAT(@XenaPath,'/S5','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Looking Death in the Eye',@XenaId,5,CONCAT(@XenaPath,'/S5','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Livia',@XenaId,5,CONCAT(@XenaPath,'/S5','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Eve',@XenaId,5,CONCAT(@XenaPath,'/S5','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Motherhood',@XenaId,5,CONCAT(@XenaPath,'/S5','/22.mp4'));
	/* XENA SEASON SIX */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Coming Home',@XenaId,6,CONCAT(@XenaPath,'/S6','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Haunting of Amphipolis',@XenaId,6,CONCAT(@XenaPath,'/S6','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Heart of Darkness',@XenaId,6,CONCAT(@XenaPath,'/S6','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Who''s Gurkhan?',@XenaId,6,CONCAT(@XenaPath,'/S6','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Legacy',@XenaId,6,CONCAT(@XenaPath,'/S6','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Abyss',@XenaId,6,CONCAT(@XenaPath,'/S6','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Rheingold',@XenaId,6,CONCAT(@XenaPath,'/S6','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Ring',@XenaId,6,CONCAT(@XenaPath,'/S6','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Return of the Valkyrie',@XenaId,6,CONCAT(@XenaPath,'/S6','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Old Ares had a Farm',@XenaId,6,CONCAT(@XenaPath,'/S6','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dangerous Prey',@XenaId,6,CONCAT(@XenaPath,'/S6','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The God you Know',@XenaId,6,CONCAT(@XenaPath,'/S6','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('You Are There',@XenaId,6,CONCAT(@XenaPath,'/S6','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Path of Vengeance',@XenaId,6,CONCAT(@XenaPath,'/S6','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('To Helicon and Back',@XenaId,6,CONCAT(@XenaPath,'/S6','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Send in the Clones',@XenaId,6,CONCAT(@XenaPath,'/S6','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Last of the Centaurs',@XenaId,6,CONCAT(@XenaPath,'/S6','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('When Fates Collide',@XenaId,6,CONCAT(@XenaPath,'/S6','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Many Happy Returns',@XenaId,6,CONCAT(@XenaPath,'/S6','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Soul Possession',@XenaId,6,CONCAT(@XenaPath,'/S6','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Friend in Need, Part 1',@XenaId,6,CONCAT(@XenaPath,'/S6','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Friend in Need, Part 2',@XenaId,6,CONCAT(@XenaPath,'/S6','/22.mp4'));
END

/* WONDER WOMAN */
BEGIN
	/* WONDER WOMAN SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The New Original Wonder Woman',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wonder Woman Meets Baroness von Gunther',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Nazi Wonder Woman',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Beauty on Parade',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Feminum Mystique: Part 1',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Feminum Mystique: Part 2',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wonder Woman vs. Gargantua',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Pluto File',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Last of the Two Dollar Bills',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Judgment From Outer Space: Part 1',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Judgment From Outer Space: Part 2',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Formula 407',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Bushwackers',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wonder Woman in Hollywood',@WonderWomanId,1,CONCAT(@WonderWomanPath,'/S1','/14.mp4'));
	/* WONDER WOMAN SEASON TWO */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Return of Wonder Woman',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Anschluss ''77',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Man Who Could Move the World',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Bermuda Triangle Crisis',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Knockout',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Pied Piper',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Queen and the Thief',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Do, I Do',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Man Who Made Volcanoes',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mind Stealers from Outer Space: Part 1',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mind Stealers from Outer Space: Part 2',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Deadly Toys',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Light-Fingered Lady',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Screaming Javelin',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Diana''s Disappearing Act',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Death in Disguise',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('IRAC Is Missing',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Flight to Oblivion',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Seance of Terror',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Man Who Wouldn''t Tell',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Girl from Ilandia',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Murderous Missile',@WonderWomanId,2,CONCAT(@WonderWomanPath,'/S2','/22.mp4'));
	/* WONDER WOMAN SEASON THREE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Teenage Idol is Missing',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hot Wheels',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Deadly Sting',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Fine Art of Crime',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Disco Devil',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Formicida',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Time Bomb',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Skateboard Wiz',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Deadly Dolphin',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Stolen Faces',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pot of Gold',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Gault''s Brain',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Going, Going, Gone',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Spaced Out',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Starships are Coming',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Amazon Hot Wax',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Richest Man in the World',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Date with Doomsday',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Girl With a Gift for Disaster',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Boy Who Knew Her Secret: Part 1',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Boy Who Knew Her Secret: Part 2',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Man Who Could Not Die',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Phantom of the Roller Coaster: Part 1',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Phantom of the Roller Coaster: Part 2',@WonderWomanId,3,CONCAT(@WonderWomanPath,'/S3','/24.mp4'));
END

/* MAMA'S FAMILY */
BEGIN
	/* MAMA'S FAMILY SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vint and the Kids Move In',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('For Better or For Worse',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Wedding (Part 1)',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Wedding (Part 2)',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Family Feud',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cellmates',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Gets a Job',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Double Standard',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Boyfriend',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fran''s Dress',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Alien Marriage',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Positive Thinking',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Silver',@MamasFamilyId,1,CONCAT(@MamasFamilyPath,'/S1','/13.mp4'));
	/* MAMA'S FAMILY SEASON TWO */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Flaming Forties',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Return of Leonard Oates',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Country Club',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Naomi and the Stork',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rashomama',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Obscene Call',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ellen''s Boyfriend',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Aunt Gert Rides Again',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Amateur Night',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Mama Who Came to Dinner',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Learns to Drive',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Black Belt Mama',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Buys a Car',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Super Market',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('No Room at the Inn',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama for Mayor (Part 1)',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama for Mayor (Part 2)',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Harper versus Harper',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Birthday',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Cries Uncle',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ask Aunt Fran',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Grave Mistake',@MamasFamilyId,2,CONCAT(@MamasFamilyPath,'/S2','/22.mp4'));
	/* MAMA'S FAMILY SEASON THREE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Farewell, Frannie',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Where There''s a Will',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Best Medicine',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('National Mama',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Soup to Nuts',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama and Dr. Brothers',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cat''s Meow',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Love Letter',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('An Ill Wind',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Steal One, Pearl Two',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Where There''s Smoke',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fly Naomi',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Santa Mama',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Desperately Seeking Anyone',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Porn Again',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Have It Mama''s Way',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Birthright',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Grandma USA',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Buck Private Bubba',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Cousin',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama with the Golden Arm',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It Takes Two to Watusi',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Fangs a Lot, Mama',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Best Policy',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('After the Fall',@MamasFamilyId,3,CONCAT(@MamasFamilyPath,'/S3','/25.mp4'));
	/* MAMA'S FAMILY SEASON FOUR */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Educating Mama',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Zirconias Are a Girl''s Best Friend',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Key to the Crime',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Breaking Up Is Hard to Do',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Big Hand for Mama',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Founder''s Day',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Teacher''s Pet',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Child''s Play',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Mania',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Gift Horse',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Workman''s Holiday',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Sees Red',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Room with No View',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Sins of the Mother',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Friend Indeed',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I Do, I Don''t',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Gets the Bird',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Girls',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama on Jeopardy!',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Goes Hawaiian (Part 1)',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Goes Hawaiian (Part 2)',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bubba''s Double Date',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bed and Breakdown',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Naomi''s Identity Crisis',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pomp and Circumstance',@MamasFamilyId,4,CONCAT(@MamasFamilyPath,'/S4','/25.mp4'));
	/* MAMA'S FAMILY SEASON FIVE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ladies Choice',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Baby Talk',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Naomi''s New Position',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Really Loud Family',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Many Unhappy Returns',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Found Money',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Mama, Myself',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Full House',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bedtime for Bubba',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What a Dump',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Bell',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Very Dirty Dancing',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Layaway Plan',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Phony Valentine',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Big Wheel',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('More Power to You',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama in One',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There''s No Place Like...No Place',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('April Fools',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Reading the Riot Act',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Taxing Situation',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Mama of Invention',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hate Thy Neighbor',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dependence Day',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Makes Three',@MamasFamilyId,5,CONCAT(@MamasFamilyPath,'/S5','/25.mp4'));
	/* MAMA'S FAMILY SEASON SIX */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama''s Medicine Show',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('An Affair to Forget',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mr. Wrong',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Now Hear This',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tri-State''s Most Wanted',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Fights Back',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Blast From the Past',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Psycho Pheno-Mama',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Take My Mama, Please!',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bubba''s House Band',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Takes Stock',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('War of the Roses',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Takes a Dive',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama Gets Goosed',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Big Nap',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pinup Mama',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Guess Who''s Going to Dinner',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Look Who''s Breathing',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('There Is Nothing Like the Dames',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bye-Bye -- Baby!',@MamasFamilyId,6,CONCAT(@MamasFamilyPath,'/S6','/20.mp4'));
END

/* STAR TREK: THE ANIMATED SERIES */
BEGIN
	/* STAR TREK: THE ANIMATED SERIES SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Beyond the Farthest Star',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Yesteryear',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One of Our Planets Is Missing',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Lorelei Signal',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('More Tribbles, More Troubles',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Survivor',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Infinite Vulcan',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Magicks of Megas-tu',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Once Upon a Planet',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mudd''s Passion',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Terratin Incident',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Time Trap',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Ambergris Element',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Slaver Weapon',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Eye of the Beholder',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Jihad',@StarTrekTASId,1,CONCAT(@StarTrekTASPath,'/S1','/16.mp4'));
	/* STAR TREK: THE ANIMATED SERIES SEASON TWO */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Pirates of Orion',@StarTrekTASId,2,CONCAT(@StarTrekTASPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bem',@StarTrekTASId,2,CONCAT(@StarTrekTASPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Practical Joker',@StarTrekTASId,2,CONCAT(@StarTrekTASPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Albatross',@StarTrekTASId,2,CONCAT(@StarTrekTASPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How Sharper Than a Serpent''s Tooth',@StarTrekTASId,2,CONCAT(@StarTrekTASPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Counter-Clock Incident',@StarTrekTASId,2,CONCAT(@StarTrekTASPath,'/S2','/06.mp4'));
END

/* STAR TREK: THE ORIGINAL SERIES */
BEGIN
	/* STAR TREK: THE ORIGINAL SERIES SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Cage',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Man Trap',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Charlie X',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Where No Man Has Gone Before',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Naked Time',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Enemy Within',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mudd''s Women',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What Are Little Girls Made Of?',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Miri',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dagger Of The Mind',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Corbomite Maneuver',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Menagerie, Part I',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Menagerie, Part II',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Conscience Of The King',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Balance Of Terror',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shore Leave',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Galileo Seven',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Squire Of Gothos',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Arena',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Tomorrow Is Yesterday',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Court Martial',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Return Of The Archons',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Space Seed',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Taste Of Armageddon',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('This Side Of Paradise',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Devil In The Dark',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Errand Of Mercy',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Alternative Factor',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/28.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The City On The Edge Of Forever',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/29.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Operation -- Annihilate!',@StarTrekTOSId,1,CONCAT(@StarTrekTOSPath,'/S1','/30.mp4'));
	/* STAR TREK: THE ORIGINAL SERIES SEASON TW0 */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Amok Time',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Who Mourns For Adonais?',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Changeling',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mirror, Mirror',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Apple',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Doomsday Machine',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Catspaw',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I, Mudd',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Metamorphosis',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Journey To Babel',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Friday''s Child',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Deadly Years',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Obsession',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wolf In The Fold',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Trouble With Tribbles',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Gamesters Of Triskelion',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Piece Of The Action',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Immunity Syndrome',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Private Little War',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Return To Tomorrow',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Patterns Of Force',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('By Any Other Name',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Omega Glory',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Ultimate Computer',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bread And Circuses',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Assignment: Earth',@StarTrekTOSId,2,CONCAT(@StarTrekTOSPath,'/S2','/26.mp4'));
	/* STAR TREK: THE ORIGINAL SERIES SEASON THREE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Spock''s Brain',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Enterprise Incident',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Paradise Syndrome',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('And The Children Shall Lead',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Is There in Truth No Beauty?',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Spectre Of The Gun',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Day Of The Dove',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('For The World Is Hollow, And I Have Touched The Sky',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Tholian Web',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Plato''s Stepchildren',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Wink Of An Eye',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Empath',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Elaan Of Troyius',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Whom Gods Destroy',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Let That Be Your Last Battlefield',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Mark Of Gideon',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('That Which Survives',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Lights Of Zetar',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Requiem for Methuselah',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Way To Eden',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Cloud Minders',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Savage Curtain',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('All Our Yesterdays',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Turnabout Intruder',@StarTrekTOSId,3,CONCAT(@StarTrekTOSPath,'/S3','/24.mp4'));
END

/* DUCKMAN */
BEGIN
	/* DUCKMAN: SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('I, Duckman',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('T.V. Or Not To Be',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Gripes Of Wrath',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Psyche',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Gland Of Opportunity',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ride The High School',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Civil War',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Not So Easy Rider',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s The Thing Of The Principal',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cellar Beware',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('American Dicks',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('About Face',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Joking The Chicken',@DuckmanId,1,CONCAT(@DuckmanPath,'/S1','/13.mp4'));
	/* DUCKAMAN SEASON TW0 */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Papa Oom M.O.W. M.O.W.',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Married Alive',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Days Of Whining And Neurosis',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Inherit The Judgment: The Dope''s Trial',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('America The Beautiful',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Germ Turns',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('In The Nam Of The Father',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Research And Destroy',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Clip Job',@DuckmanId,2,CONCAT(@DuckmanPath,'/S2','/09.mp4'));
	/* DUCKMAN SEASON THREE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Noir Gang',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Forbidden Fruit',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Grandma-ma''s Flatulent Adventure',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Color Of Naught',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Sperms Of Endearment',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Room With A Bellevue',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Apocalypse Not',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Clear And Presidente Danger',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Girls Of Route Canal',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Mallardian Candidate',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Pig Amok',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Once And Future Duck',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Planet Of The Dopes',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Aged Heat',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('They Craved Duckman''s Brain',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Road To Dendron',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Exile In Guyville',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Longest Weekend',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Amazing Colossal Duckman',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Cock Tales For Four',@DuckmanId,3,CONCAT(@DuckmanPath,'/S3','/20.mp4'));
	/* DUCKMAN SEASON FOUR */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dammit, Hollywood',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Coolio Runnings',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Aged Heat 2: Women In Heat',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('All About Elliot',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('From Brad To Worse',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bonfire Of The Panties',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Role With It',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ajax and Ajaxer',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('With Friends Like These',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Trophied Duck',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Star is Abhorred',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bev Takes a Holiday',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Love! Anger! Kvetching!',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Duckman and Cornfed in ''Haunted Society Plumbers''',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Ebony, Baby',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Vuuck, as in Duck',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Crime, Punishment, War, Peace, and the Idiot',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Kidney, Popsicle, and Nuts',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Tami Show',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Feral Lady',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Westward, No!',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Short, Plush and Deadly',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/22.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('How to Suck in Business Without Really Trying',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/23.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('You''ve Come the Wrong Way, Baby',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/24.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Hamlet 2: This Time It''s Personal',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/25.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Das Sub',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/26.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Where No Duckman Has Gone Before',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/27.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Four Weddings Inconceivable',@DuckmanId,4,CONCAT(@DuckmanPath,'/S4','/28.mp4'));
END

/* WHAT'S HAPPENING!! */
BEGIN

	/* WHAT'S HAPPENING!!: SEASON ONE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Runaway',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Birthday Present',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('When Daddy Comes Marching Home',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('My Three Tons',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Saturday''s Hero',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Burger Queen',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Speak for Yourself, Dwayne',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shirley''s Date',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Christmas',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Puppy Love',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Maid Did It',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Incomplete Shakespeare',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Hospital Stay',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Sunday Father',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Firing Squad',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Boarder',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dwayne''s Dilemma',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Tickets',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('What''s Wrong with Raj?',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nice Guys Finish Last',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('From Here to Maternity',@WhatsHappening,1,CONCAT(@WhatsHappeningPath,'/S1','/21.mp4'));

	/* WHAT'S HAPPENING!!: SEASON TWO */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rerun Gets Married',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('It''s All in Your Head',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Trial and Error',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Raj Goes to Press',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Nothing Personal',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('If I''m Elected',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Play''s the Big Thing',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Give Me Odds',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Bill Gets Married',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Mama, the School Girl',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('One Strike and You''re Out',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Testimonial',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Black and White Blues',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Going, Going, Gong',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dee''s First Date',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Doobie or Not Doobie (1)',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Doobie or Not Doobie (2)',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Rerun Sees the Light',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Raj and the Older Woman',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Diplomatic Immunity',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shirley Is a Mother',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Apartment',@WhatsHappening,2,CONCAT(@WhatsHappeningPath,'/S2','/22.mp4'));

	/* WHAT'S HAPPENING!!: SEASON THREE */
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Disco Dollar Disaster',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/01.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shirley''s Boyfriend',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/02.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Basketball Brain',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/03.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Creep Detective',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/04.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shirley''s Cookies',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/05.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Landlady',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/06.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Charge',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/07.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Raj Moves Out',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/08.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('No Clothes Make the Man',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/09.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Positive Identification',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/10.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Making Out',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/11.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dee, the Cheerleader',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/12.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('A Present for Dee',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/13.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dwayne''s Dream',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/14.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Shirley''s Fired',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/15.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Food Poisoning',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/16.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Eviction',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/17.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Thomas Treasure',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/18.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Last Page',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/19.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('First Class Coach',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/20.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('Dwayne''s Debate',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/21.mp4'));
	INSERT INTO Episode ([Title],[SeriesId],[Season],[Path]) VALUES ('The Benefit Show',@WhatsHappening,3,CONCAT(@WhatsHappeningPath,'/S3','/22.mp4'));
END

/*
Season 1
 
The Runaway
The Birthday Present
When Daddy Comes Marching Home
My Three Tons
Saturday's Hero
The Burger Queen
Speak for Yourself, Dwayne
Shirley's Date
Christmas
Puppy Love
The Maid Did It
The Incomplete Shakespeare
The Hospital Stay
The Sunday Father
The Firing Squad
The Boarder
Dwayne's Dilemma
The Tickets
What's Wrong with Raj?
Nice Guys Finish Last
From Here to Maternity
 
Season 2
 
Rerun Gets Married
It's All in Your Head
Trial and Error
Raj Goes to Press
Nothing Personal
If I'm Elected
The Play's the Big Thing
Give Me Odds
Bill Gets Married
Mama, the School Girl
One Strike and You're Out
The Testimonial
Black and White Blues
Going, Going, Gong
Dee's First Date
Doobie or Not Doobie (1)
Doobie or Not Doobie (2)
Rerun Sees the Light
Raj and the Older Woman
Diplomatic Immunity
Shirley Is a Mother
The Apartment
 
Season 3
 
Disco Dollar Disaster
Shirley's Boyfriend
Basketball Brain
The Creep Detective
Shirley's Cookies
The Landlady
Charge
Raj Moves Out
No Clothes Make the Man
Positive Identification
Making Out
Dee, the Cheerleader
A Present for Dee
Dwayne's Dream
Shirley's Fired
Food Poisoning
The Eviction
The Thomas Treasure
The Last Page
First Class Coach
Dwayne's Debate
The Benefit Show
*/