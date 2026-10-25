<template>
	<div class="w-full h-full">
		<div>
			<Tabs as="div" v-model="portal_tabs" :tabs="tabs">
				<template #tab-panel="{ tab }">
					<div v-if="tab.label == 'Appointments'">
						<AppointmentModel />
					</div>
					<div v-else-if="tab.label == 'Diagnostics'">
						<DiagnosticModel />
					</div>
				</template>
			</Tabs>
		</div>
	</div>

	<Dialog
		:title="dialog_title"
		:message="dialog_message"
		size="xl"
		icon="lucide-triangle-alert"
		theme="amber"
		:actions="[{ label: 'OK', variant: 'solid' }]"
		v-model="alert_dialog"
	/>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppointmentModel from '@/components/AppointmentModel.vue'
import DiagnosticModel from '@/components/DiagnosticModel.vue'

import {
	createResource,
	Tabs,
	Dialog,
} from 'frappe-ui'

let alert_dialog = ref(false);

const portal_tabs = ref('Appointments');

let dialog_title = ref("");
let dialog_message = ref("");

let healthcareSettings = ref({});

let getHealthcareSettings = createResource({
	url: "/api/method/healthcare.healthcare.api.patient_portal.get_settings",
	method: "GET",
	onSuccess(response) {
		if (response) {
			healthcareSettings.value = response
		}
	},
});
getHealthcareSettings.fetch();

const tabs = computed(() => {
	let baseTabs = [{ label: 'Appointments', value: 'Appointments' }]
	if (healthcareSettings.value.show_diagnostics_tab) {
		baseTabs.push({ label: 'Diagnostics', value: 'Diagnostics' })
	}
	return baseTabs
})

let set_logged_in_patient = createResource({
	url: "/api/method/healthcare.healthcare.api.patient_portal.get_logged_in_patient",
	method: "GET",
	onSuccess(response) {
		if (response) {
			localStorage.setItem("patient", JSON.stringify(response));
		}
	},
	onError(error) {
		dialog_message = error.messages?.[0] || error;
		dialog_title = "Failed to load appointments";
		alert_dialog.value = true;
	}
});
set_logged_in_patient.fetch();

</script>
