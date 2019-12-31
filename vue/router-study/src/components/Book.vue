<template>
	<div>
		book is: {{bookID}}
	</div> 
</template>
<script>
	export default {
		data () {
			return { 
				bookID: 0
			}
		},
		created () {
			this.bookID = this.$route.params.id
		},
		watch: {
			'$route' (to, from){
				this.bookID = to.params.id
			}
		}
	}   	
</script>
<style scoped>
</style>
