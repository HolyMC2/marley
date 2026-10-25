<template>
	<!-- frappe-ui 1.0 dropped Card; this keeps the 0.1 shell the portal's tiles are styled against -->
	<div class="flex flex-col rounded-6 border bg-white px-6 py-5 shadow">
		<div class="mt-4 flex-auto overflow-auto">
			<slot />
		</div>
	</div>
</template>
