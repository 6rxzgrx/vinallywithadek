// Utils
import { getAlbumPath } from '../../utils/getPublicPath';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

export enum WeddingGiftTypesEnum {
	GIFT_1 = 'GIFT_TYPE_TRANSFER_BANK',
	GIFT_2 = 'GIFT_TYPE_TOPUP_EMONEY',
	GIFT_3 = 'GIFT_TYPE_SEND_GIFT',
}

const publicURL = (url: string) => (url.startsWith('/') ? url : `/${url}`);

export const Gift1: Song = {
	name: 'GIFT_1_NAME',
	imageUrl: publicURL('/images/wedding-gift/bri.png'),
	length: 'GIFT_1_ARTIST',
	explanation: 'GIFT_EXPLANATION_1',
	types: [WeddingGiftTypesEnum.GIFT_1],
	paymentDetails: {
		accountNumber: '037801051963505',
		accountName: 'Alviana Juni Susanti',
	},
	skills: [],
	relatedSongs: [],
} as Song;

export const Gift2: Song = {
	name: 'GIFT_2_NAME',
	imageUrl: publicURL('/images/wedding-gift/bca.png'),
	length: 'GIFT_2_ARTIST',
	explanation: 'GIFT_EXPLANATION_2',
	types: [WeddingGiftTypesEnum.GIFT_1],
	paymentDetails: {
		accountNumber: '8210876988',
		accountName: 'Adek Muhammad Zulkham R. K.',
	},
	skills: [],
	relatedSongs: [],
} as Song;

export const Gift3: Song = {
	name: 'GIFT_3_NAME',
	imageUrl: publicURL('/images/wedding-gift/mandiri.png'),
	length: 'GIFT_3_ARTIST',
	explanation: 'GIFT_EXPLANATION_3',
	types: [WeddingGiftTypesEnum.GIFT_1],
	paymentDetails: {
		accountNumber: '1420022134133',
		accountName: 'Adek Muhammad Zulkham R. K.',
	},
	skills: [],
	relatedSongs: [],
} as Song;

export const Gift4: Song = {
	name: 'GIFT_4_NAME',
	imageUrl: publicURL('/images/wedding-gift/dana.png'),
	length: 'GIFT_4_ARTIST',
	explanation: 'GIFT_EXPLANATION_4',
	types: [WeddingGiftTypesEnum.GIFT_2],
	paymentDetails: {
		accountNumber: '081555376076',
		accountName: 'Alviana Juni Susanti',
	},
	skills: [],
	relatedSongs: [],
} as Song;

export const Gift5: Song = {
	name: 'GIFT_5_NAME',
	imageUrl: publicURL('/images/wedding-gift/jago.png'),
	length: 'GIFT_5_ARTIST',
	explanation: 'GIFT_EXPLANATION_5',
	types: [WeddingGiftTypesEnum.GIFT_2],
	paymentDetails: {
		accountNumber: '106892686975',
		accountName: 'Alviana Juni Susanti',
	},
	skills: [],
	relatedSongs: [],
} as Song;

export const Gift6: Song = {
	name: 'GIFT_6_NAME',
	imageUrl: publicURL('/images/wedding-gift/shopee.png'),
	length: 'GIFT_6_ARTIST',
	explanation: 'GIFT_EXPLANATION_6',
	types: [WeddingGiftTypesEnum.GIFT_2],
	paymentDetails: {
		accountNumber: '085648844927',
		accountName: 'Adek Muhammad Zulkham R. K.',
	},
	skills: [],
	relatedSongs: [],
} as Song;

export const Gift7: Song = {
	name: 'GIFT_7_NAME',
	imageUrl: publicURL('/images/wedding-gift/home.png'),
	length: 'GIFT_7_ARTIST',
	description: 'GIFT_DETAILS_7',
	types: [WeddingGiftTypesEnum.GIFT_3],
	maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5919901265156!2d112.35923747575775!3d-8.142951391887147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78979ed7db073d%3A0xcb222cd85a28cf8a!2sGedung%20Caraka%20Putra%20(GCP)!5e0!3m2!1sen!2sid!4v1768727602831!5m2!1sen!2sid',
	explanation: 'GIFT_EXPLANATION_7',
	skills: [],
	relatedSongs: [],
} as Song;

export const WeddingGift = {
	name: 'Wedding Gift',
	description: 'WEDDING_GIFT_DESCRIPTION',
	color: '#FFD700',
	songs: [Gift1, Gift2, Gift3, Gift4, Gift5, Gift6, Gift7],
	filters: [
		WeddingGiftTypesEnum.GIFT_1,
		WeddingGiftTypesEnum.GIFT_2,
		WeddingGiftTypesEnum.GIFT_3,
	],
	getImage(lang) {
		return getAlbumPath('WeddingGift-cover', lang, 'png');
	},
} as Playlist;
