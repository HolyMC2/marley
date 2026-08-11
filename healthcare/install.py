import click

import frappe

import healthcare


# Frappe majors this fork is validated against beyond the develop-branch
# self-match. develop bumped itself to 17.0.0-dev while Frappe 16 is current
# stable — the upstream gate compares raw majors and refuses v16 even though
# the code at this commit is the same the muelle bench has run baked since
# 2026-05-28. Validated on the muelle lab bench (Frappe 16.28).
SUPPORTED_FRAPPE_MAJORS = {"16"}


def before_install():
	def major_version(v: str) -> str:
		return v.split(".")[0]

	frappe_version = major_version(frappe.__version__)
	healthcare_version = major_version(healthcare.__version__)

	if frappe_version == healthcare_version:
		return

	if frappe_version in SUPPORTED_FRAPPE_MAJORS:
		return

	click.secho(
		f"You're attempting to install Marley Healthcare develop branch on Frappe and ERPNext version {frappe_version}."
		"This is not supported and will result in broken install. Switch to correct branch before installing.",
		fg="red",
	)

	raise SystemExit(1)
