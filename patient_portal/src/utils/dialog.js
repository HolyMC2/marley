import { watch } from "vue"

// frappe-ui 1.0's `dismissible: false` refuses Escape as well as an outside
// click. The booking dialog refuses only the outside click, so Escape still
// closes it. `anchor` is any element inside the dialog.
export function useEscapeCloses(anchor, close) {
	const onKeydown = (event) => {
		if (event.key === "Escape") close()
	}
	watch(
		anchor,
		(element, _, onCleanup) => {
			const dialog = element?.closest('[role="dialog"]')
			if (!dialog) return
			dialog.addEventListener("keydown", onKeydown)
			onCleanup(() => dialog.removeEventListener("keydown", onKeydown))
		},
		{ flush: "post", immediate: true }
	)
}
