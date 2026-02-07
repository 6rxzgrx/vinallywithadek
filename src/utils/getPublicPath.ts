const getPath = (path: string) => {
	const baseUrl = import.meta.env.BASE_URL;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	return `${baseUrl}${cleanPath}`;
};

export const getSongPath = (song: string) => getPath(`/songs/${song}`);

export const getAlbumPath = (album: string, lang: string, ext: string) => {
	return getPath(`images/albums/${album}-${lang}.${ext}`);
};

export const getAlbumPathWithoutLang = (album: string, ext: string) => {
	return getPath(`images/albums/${album}.${ext}`);
};

export const getSocialNetworkPath = (socialNetwork: string) =>
	getPath(`images/social/${socialNetwork}`);

export const getProjectPath = (project: string) =>
	getPath(`images/projects/${project}`);

export const getExperiencePath = (experience: string) =>
	getPath(`images/experience/${experience}`);

export const getEducationPath = (education: string) =>
	getPath(`images/education/${education}`);

export const getPublicationPath = (publication: string) =>
	getPath(`images/publications/${publication}`);
