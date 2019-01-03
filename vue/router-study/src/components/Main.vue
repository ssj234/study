<template>
	<div>
		<div class="content">
			<transition name="fade">
			<router-view></router-view>
			</transition>
		</div>
		<div class="footer">
			<router-link :to="{name : 'HelloWorld'}" active-class="active">
				<span>hello</span>
			</router-link>
			<router-link :to="{name : 'Book', params: { id: 1 }}" active-class="active">
				<span>book</span>
			</router-link>
			<router-link :to="{name : 'Book', params: { id: 2 }}" active-class="active">
				<span>book</span>
			</router-link>
		</div>
	</div>
</template>
<script>
export default {
	
}
</script>
<style scoped>
	.content{
		width: 300px;
	}
	.footer{
		position: fixed;
		bottom: 0px;
		left: 0px;
		height: 30px;
	}
	.active{
		color: red
	}
</style>
