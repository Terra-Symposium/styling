import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import {
	ACTION_VARIANTS,
	DISABLED_STATE_VARIANTS,
	FOCUS_VISIBLE_VARIANTS,
	FORM_CONTROL_VARIANTS,
	FORM_LABEL_VARIANTS,
	INTERACTIVE_CONTROL_VARIANTS,
	MENU_ITEM,
	MENU_ITEM_INDICATOR,
	OVERLAY_MOTION_VARIANTS,
	OVERLAY_SURFACE_VARIANTS,
	RADIX_SIDE_POSITION_VARIANTS,
	SURFACE_VARIANTS,
	TEXT_VARIANTS,
	TOGGLE_VARIANTS,
	menuItemVariants,
} from '../src/ui/terra-original/variants.ts';

const repo = process.cwd();
const colors = ['primary', 'secondary', 'gray', 'destructive'] as const;
const uiSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const actionTypes = ['default', 'outline', 'ghost', 'tonal', 'link', 'underline'] as const;
const surfaceTypes = ['default', 'outline', 'ghost', 'tonal', 'saturated'] as const;
const formTypes = ['default', 'outline', 'ghost', 'tonal'] as const;
const toggleTypes = ['default', 'outline', 'ghost', 'tonal'] as const;
const matrixKey = (color: string, treatment: string): string => (treatment === 'default' ? color : `${color}-${treatment}`);
const source = (file: string): string => readFileSync(join(repo, file), 'utf8');
const hasClasses = (value: string | undefined, name: string): void => assert.ok(value?.trim(), `${name} should generate classes`);

test('action, surface, form-control, and toggle matrices generate every valid color/treatment/size combination', () => {
	for (const color of colors) {
		for (const treatment of actionTypes) {
			for (const size of uiSizes) hasClasses(ACTION_VARIANTS({ variant: matrixKey(color, treatment) as never, size }), `action ${color}/${treatment}/${size}`);
		}
		for (const treatment of surfaceTypes) {
			for (const size of uiSizes) hasClasses(SURFACE_VARIANTS({ variant: matrixKey(color, treatment) as never, size }), `surface ${color}/${treatment}/${size}`);
		}
		for (const treatment of formTypes) {
			for (const size of uiSizes) hasClasses(FORM_CONTROL_VARIANTS({ variant: matrixKey(color, treatment) as never, size }), `form ${color}/${treatment}/${size}`);
		}
		for (const treatment of toggleTypes) {
			for (const size of uiSizes) hasClasses(TOGGLE_VARIANTS({ variant: matrixKey(color, treatment) as never, size }), `toggle ${color}/${treatment}/${size}`);
		}
	}
});

test('legacy aliases, button icon sizes, and semantic feedback remain available', () => {
	for (const variant of ['default', 'outline', 'ghost', 'tonal', 'ghost-destructive', 'inline', 'underline'] as const) {
		hasClasses(ACTION_VARIANTS({ variant }), `action alias ${variant}`);
	}
	for (const size of ['icon', 'icon-sm', 'default'] as const) hasClasses(ACTION_VARIANTS({ size }), `button size ${size}`);
	for (const variant of ['default', 'outline', 'ghost', 'tonal', 'ghost-destructive'] as const) hasClasses(TOGGLE_VARIANTS({ variant }), `toggle alias ${variant}`);
	for (const variant of ['correct', 'error', 'info', 'success', 'warning', 'transparent', 'dark'] as const) hasClasses(SURFACE_VARIANTS({ variant }), `surface status ${variant}`);
	assert.match(SURFACE_VARIANTS({ variant: 'correct' }), /emerald/);
	assert.match(SURFACE_VARIANTS({ variant: 'success' }), /emerald/);
	assert.match(SURFACE_VARIANTS({ variant: 'warning' }), /amber/);
	assert.match(SURFACE_VARIANTS({ variant: 'info' }), /sky/);
});

test('text, label, interaction, overlay, and menu contracts generate shared classes', () => {
	hasClasses(TEXT_VARIANTS({ tone: 'muted', size: 'md', weight: 'medium' }), 'text');
	hasClasses(FORM_LABEL_VARIANTS(), 'form label');
	hasClasses(FOCUS_VISIBLE_VARIANTS(), 'focus-visible');
	hasClasses(DISABLED_STATE_VARIANTS({ target: 'native' }), 'native disabled');
	hasClasses(DISABLED_STATE_VARIANTS({ target: 'data' }), 'data disabled');
	hasClasses(DISABLED_STATE_VARIANTS({ target: 'aria' }), 'ARIA disabled');
	hasClasses(INTERACTIVE_CONTROL_VARIANTS(), 'interactive control');
	hasClasses(OVERLAY_SURFACE_VARIANTS(), 'overlay surface');
	hasClasses(OVERLAY_MOTION_VARIANTS(), 'overlay motion');
	hasClasses(RADIX_SIDE_POSITION_VARIANTS(), 'Radix side position');
	hasClasses(menuItemVariants({ intent: 'destructive' }), 'menu item intent');
	hasClasses(MENU_ITEM, 'menu item highlight');
	hasClasses(MENU_ITEM_INDICATOR, 'menu item indicator');
});

test('shared exports retain multiple UI consumers and one-off contracts live with their components', () => {
	const consumers: Record<string, string[]> = {
		// Button and ButtonLink both call this contract from the same module.
		ACTION_VARIANTS: ['src/ui/terra-original/button.tsx', 'src/ui/terra-original/button.tsx'],
		FOCUS_VISIBLE_VARIANTS: ['src/ui/terra-original/dialog.tsx', 'src/ui/terra-original/tabs.tsx'],
		DISABLED_STATE_VARIANTS: ['src/ui/terra-original/dialog.tsx', 'src/ui/terra-original/tabs.tsx'],
		TOGGLE_VARIANTS: ['src/ui/terra-original/toggle.tsx', 'src/ui/terra-original/toggle-group.tsx'],
		SURFACE_VARIANTS: [
			'src/ui/terra-original/alert.tsx',
			'src/ui/terra-original/badge.tsx',
			'src/ui/terra-original/card.tsx',
			'src/ui/terra-original/dialog.tsx',
			'src/ui/terra-original/drawer.tsx',
			'src/ui/terra-original/radio-group.tsx',
			'src/ui/terra-original/sheet.tsx',
		],
		FORM_CONTROL_VARIANTS: ['src/ui/terra-original/input.tsx', 'src/ui/terra-original/select.tsx', 'src/ui/terra-original/textarea.tsx'],
		INTERACTIVE_CONTROL_VARIANTS: ['src/ui/terra-original/checkbox.tsx', 'src/ui/terra-original/radio-group.tsx', 'src/ui/terra-original/slider.tsx', 'src/ui/terra-original/switch.tsx'],
		FORM_LABEL_VARIANTS: ['src/ui/terra-original/form.tsx', 'src/ui/terra-original/label.tsx'],
		TEXT_VARIANTS: ['src/ui/terra-original/tabs.tsx', 'src/ui/terra-original/tooltip.tsx'],
		OVERLAY_SURFACE_VARIANTS: [
			'src/ui/terra-original/context-menu.tsx',
			'src/ui/terra-original/dropdown-menu.tsx',
			'src/ui/terra-original/popover.tsx',
			'src/ui/terra-original/select.tsx',
			'src/ui/terra-original/tooltip.tsx',
		],
		OVERLAY_MOTION_VARIANTS: [
			'src/ui/terra-original/context-menu.tsx',
			'src/ui/terra-original/dropdown-menu.tsx',
			'src/ui/terra-original/popover.tsx',
			'src/ui/terra-original/select.tsx',
			'src/ui/terra-original/tooltip.tsx',
		],
		RADIX_SIDE_POSITION_VARIANTS: [
			'src/ui/terra-original/context-menu.tsx',
			'src/ui/terra-original/dropdown-menu.tsx',
			'src/ui/terra-original/popover.tsx',
			'src/ui/terra-original/select.tsx',
			'src/ui/terra-original/tooltip.tsx',
		],
		menuItemVariants: ['src/ui/terra-original/context-menu.tsx', 'src/ui/terra-original/dropdown-menu.tsx'],
		MENU_ITEM: ['src/ui/terra-original/context-menu.tsx', 'src/ui/terra-original/dropdown-menu.tsx'],
		MENU_ITEM_INDICATOR: ['src/ui/terra-original/context-menu.tsx', 'src/ui/terra-original/dropdown-menu.tsx'],
	};
	for (const [contract, files] of Object.entries(consumers)) {
		assert.ok(files.length > 1, `${contract} should have at least two component consumers`);
		let usages = 0;
		for (const file of files) {
			const matches = source(file).match(new RegExp(`\\b${contract}\\b`, 'g')) ?? [];
			assert.ok(matches.length > 0, `${file} should consume ${contract}`);
			usages += matches.length;
		}
		assert.ok(usages > 1, `${contract} should be used by multiple UI components`);
	}

	const shared = source('src/ui/terra-original/variants.ts');
	for (const local of ['BADGE_VARIANTS', 'buttonGroupVariants', 'InputOTPPattern', 'INPUT_VARIANT_SIZE_CLASSES']) {
		assert.doesNotMatch(shared, new RegExp(`export const ${local}\\b`), `${local} should not be exported as a shared contract`);
	}
	assert.match(source('src/ui/terra-original/badge.tsx'), /cva\('inline-flex[\s\S]*?defaultVariants:\s*\{/);
	assert.match(source('src/ui/terra-original/button-group.tsx'), /const BUTTON_GROUP_VARIANTS\s*=/);
	});
