import { storage } from '~/plugins/firebase.js'

const state = () => ({
	filesList: []
});

const mutations = {
	setFilesList (state, payload) {
		state.filesList = payload
	},
	addFileToList (state, payload) {
		state.filesList.push(payload)
	},
	removeFileFromList (state, payload) {
		const allFiles = state.filesList
        allFiles.forEach((value, index) => {
            if (value.fullPath === payload) {
                state.filesList.splice(index, 1)
            }
        })
	}
};

const getters = {
	getFilesList (state) {
		return state.filesList
	}
};

const actions = {
	fetchFilesList ({commit}, payload) {
		return storage.ref('documents').listAll().then(res => {
			let promises = []
			res.items.forEach(itemRef => {
				promises.push(itemRef.getMetadata().then(metadata => {
					// console.log(metadata)
					return Promise.resolve({
						name: metadata.name,
						type: metadata.contentType,
						size: (metadata.size / 1024).toFixed(2),
						fullPath: metadata.fullPath
					})
				}))
			})
			return Promise.all(promises).then(files => {
				commit('setFilesList', files)
			})
		})
	},
	uploadFileToStorage ({commit}, payload) {
        const file = payload.file
        const subFolderName = payload.subFolderName ? payload.subFolderName : ''
        const filename = file.name
        const removeExt = filename.split('.')
        const fileExtension = removeExt[1]
        const storageFileName = removeExt[0] + '_' + Number(Date.now()) + '.' + fileExtension
		const storageDocRef = storage.ref(subFolderName ? (subFolderName + '/' + storageFileName) : storageFileName)
		
        return storageDocRef.put(file).then((snapshot) => {
			const metadata = snapshot.metadata
			commit('addFileToList', {
				name: metadata.name,
				type: metadata.contentType,
				size: (metadata.size / 1024).toFixed(2),
				fullPath: metadata.fullPath
			})
			return { status: 'success' }
        }).catch(error => {
		   console.log('Uploading file failed::', error)
		   return { message: error }
		})
	},
	downloadSelectedFile({commit}, payload) {
		return storage.ref(payload).getDownloadURL().then(downloadURL => {
		   return { 'url': downloadURL }
		})
	},
	removeFileFromStorage ({commit}, payload) {
        return storage.ref(payload).delete().then(() => {
			commit('removeFileFromList', payload)
            return { status: 'success' }
        })
        .catch(error => {
            console.log('Error on delete:', error)
            return { message: error }
        })
    }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}