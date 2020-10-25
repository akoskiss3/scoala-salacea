<template>
	<v-container>
		<v-row class="pl-2 mb-n1 mt-1">
			<v-tooltip bottom>
				<template v-slot:activator="{on}">
					<v-btn icon to="/admin" v-on="on" color="white"><v-icon color="#3F3B41" class="mt-n1" size="25">mdi-chevron-left</v-icon></v-btn>
				</template>
				<span>Back</span>
			</v-tooltip>
			<span class="title font-weight-regular ml-2">Documents</span>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-alert v-if="deleteFeedback" dismissible type="success" outlined transition="fade-transition">Selected file deleted successfully!</v-alert>
				<v-card outlined class="elevation-1">
					<v-card-title class="subtitle-1">
						<v-row>
							<v-col cols="12" class="mt-n4 mb-n9">
								<client-only>
									<file-pond
										name="document"
										ref="pond_document"
										label-idle="Drop files here or Browse"
										:allow-multiple="true"
										@removefile="handleRemoveFile"
										@processfile="processFile"
										v-on:addfile="handleFilePondAddFile"
										:updatefiles="handleFilePondUpdateFiles"
										:allowBrowse="true"
										:server="{ process, revert, restore, load, fetch }" />
								</client-only>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-text>
						<v-data-table
							:headers="headers"
							:items="filesList"
							:items-per-page="15"
							class="elevation-0"
							hide-default-footer>
							<template v-slot:[`item.actions`]="{item}">
								<v-tooltip bottom open-delay="100">
									<template v-slot:activator="{on}">
										<v-btn icon v-on="on" color="brown lighten-1" @click="downloadFile(item)">
											<v-icon class="pt-1">mdi-download</v-icon>
										</v-btn>
									</template>
									<span>Download</span>
								</v-tooltip>
								<v-tooltip bottom open-delay="100">
									<template v-slot:activator="{on}">
										<v-btn icon v-on="on" color="red darken-3" @click="deleteFile(item)">
											<v-icon>mdi-delete</v-icon>
										</v-btn>
									</template>
									<span>Delete</span>
								</v-tooltip>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
import { mapGetters } from 'vuex'

export default {
	layout: 'admin',
	components: { FilePond },
	data () {
		return {
			headers: [
				{ text: 'Filename', align: 'start', sortable: false, value: 'name', width: '65%' },
        		{ text: 'Filetype', value: 'type', sortable: false, align: 'center' },
        		{ text: 'Size in KB', value: 'size', sortable: false, align: 'center' },
        		{ text: 'Actions', value: 'actions', sortable: false, align: 'center' },
		  ],
		  deleteFeedback: false
		}
	},
	mounted () {
		this.$store.dispatch('modules/documents/fetchFilesList')
	},
	computed: {
		...mapGetters('modules/documents', {
			filesList: 'getFilesList'
		})
	},
	methods: {
		downloadFile (file) {
			this.$store.dispatch('modules/documents/downloadSelectedFile', file.fullPath).then(response => {
				let link = document.createElement('a')
				link.setAttribute('target', '_blank')
				link.href = response.url
				link.download = response.url
				link.click()
			})
		},
		deleteFile (file) {
			this.$store.dispatch('modules/documents/removeFileFromStorage', file.fullPath).then(res => {
				if (res.status === 'success') {
					this.deleteFeedback = true
					setTimeout(() => {
						this.deleteFeedback = false
					}, 15000);
				}
			})
		},
		handleRemoveFile(...params) {
			const paramData = params[1]
			console.log('PARAM DATA :', paramData)
            const removedFileName = paramData.filenameWithoutExtension
			console.log('removedFileName:', removedFileName)
			let file = this.filesList.filter(item => item.name.includes(removedFileName))
			this.deleteFile(file[0])
		},
		process(fieldName, file, metadata, load, error, progress, abort) {
			console.log('[ Uploaded file ] ::', file)
			this.$store.dispatch('modules/documents/uploadFileToStorage', {
				file: file,
				subFolderName: 'documents'
			}).then(() => load())
		},
		load(uniqueFileId, load, error) {},
        fetch(url, load, error, progress, abort, headers) {
            error('Local files only')
		},
		handleFilePondAddFile(err, file) {},
		handleFilePondUpdateFiles(file) {},
        processFile(e, file) {},
        restore(uniqueFileId, load, error, progress, abort, headers) {},
		revert(uniqueFileId, load, error) {},
	}
}
</script>
