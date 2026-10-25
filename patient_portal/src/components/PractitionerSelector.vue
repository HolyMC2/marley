<template>
	<div class="flex flex-col h-[99%] animate-fade-in">
		<div class="flex items-center justify-between py-4">
			<h2 class="text-md-semibold py-2">Select a Practitioner</h2>

			<!-- Pagination -->
			<div class="flex items-center gap-2">
				<Button size="sm" :disabled="page === 1" @click="$emit('update:page', page - 1)">
					<LucideChevronLeft class="size-5 text-ink-white-7" />
				</Button>
				<span class="text-sm text-gray-600 flex items-center">Page {{ page }} of {{ totalPages }}</span>
				<Button size="sm" :disabled="page === totalPages" @click="$emit('update:page', page + 1)">
					<LucideChevronRight class="size-5 text-ink-white-7" />
				</Button>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			<Card v-for="doc in items" :key="doc.name"
				class="relative cursor-pointer rounded-7 !shadow-xs border transition-transform duration-150 !p-3 bg-white
					!shadow-none drop-shadow-lg hover:drop-shadow-md"
				:class="selected?.name === doc.name
					? '!border-gray-500 border-2'
					: 'border-gray-200 hover:shadow-md hover:scale-105'" @click="$emit('update:selected', doc)"
			>
				<div v-if="selected?.name === doc.name"
					class="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md z-20">
					<LucideCheck class="w-4 h-4" />
				</div>
				<div class="flex flex-col items-center">
					<img v-if="doc.image" :src="doc.image" class="w-full h-32 object-cover rounded-t-7 bg-gray-100" />
					<div v-else
						class="w-full h-32 flex items-center justify-center rounded-t-7 text-gray-700 text-4xl-semibold bg-gray-100">
						{{ doc.practitioner_name.charAt(0).toUpperCase() }}
					</div>
					<div
						class="p-1 text-center text-base-medium md:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
						{{ doc.practitioner_name }}
					</div>
					<div class="text-sm text-gray-500">{{ doc.designation }}</div>
					<div class="text-sm text-gray-500">{{ doc.department }}</div>
				</div>
			</Card>
		</div>
	</div>
</template>

<script setup>
import { Button } from "frappe-ui";
import LucideCheck from "~icons/lucide/check";
import LucideChevronLeft from "~icons/lucide/chevron-left";
import LucideChevronRight from "~icons/lucide/chevron-right";
import Card from "@/components/Card.vue";

defineProps({
	items: Array,
	selected: Object,
	page: Number,
	totalPages: Number
});
</script>
