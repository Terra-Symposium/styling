import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { applyHue } from '../../../dist/index.js';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Input,
	Label,
	PortalContainerProvider,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../dist/ui/terra-original/index.js';

function Example({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className='styling-example'>
			<h2>{title}</h2>
			{children}
		</section>
	);
}

export function ComponentShowcase() {
	const [checked, setChecked] = useState(true);
	const [enabled, setEnabled] = useState(true);
	const root = useRef<HTMLDivElement>(null);
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
	useEffect(() => {
		setPortalContainer(root.current);
		if (root.current) applyHue(145, root.current);
	}, []);
	return (
		<div className='terra-docs-workspace styling-demo-root' ref={root}>
		<PortalContainerProvider container={portalContainer}>
		<main className='styling-showcase'>
			<header className='styling-showcase-header'>
				<a href='/styling-docs/components/'>← Components</a>
				<p className='styling-eyebrow'>Terra Styling · interactive reference</p>
				<h1>Component showcase</h1>
				<p>These examples use the public components and CSS exported by <code>@terra-symposium/styling</code>.</p>
			</header>

			<div className='styling-showcase-grid'>
				<Example title='Buttons and status'>
					<div className='styling-row'>
						<Button>Primary</Button>
						<Button variant='secondary'>Secondary</Button>
						<Button variant='outline'>Outline</Button>
						<Button variant='ghost'>Ghost</Button>
						<Button variant='destructive'>Delete</Button>
						<Badge>Ready</Badge>
					</div>
				</Example>

				<Example title='Form controls'>
					<div className='styling-form-grid'>
						<div className='styling-field'>
							<Label htmlFor='styling-name'>Name</Label>
							<Input id='styling-name' defaultValue='Terra Symposium' />
						</div>
						<div className='styling-field'>
							<Label htmlFor='styling-select'>Section</Label>
							<Select defaultValue='overview' size='md'>
								<SelectTrigger id='styling-select' aria-label='Choose a section'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent position='popper' align='start'>
									<SelectItem value='overview'>Overview</SelectItem>
									<SelectItem value='guides'>Guides</SelectItem>
									<SelectItem value='reference'>Reference</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<label className='styling-check-row'>
							<Checkbox checked={checked} onCheckedChange={value => setChecked(value === true)} />
							<span>Include archived pages</span>
						</label>
						<label className='styling-check-row'>
							<Switch checked={enabled} onCheckedChange={setEnabled} />
							<span>Enable public access</span>
						</label>
					</div>
				</Example>

				<Example title='Dropdown and context menus'>
					<div className='styling-row'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild><Button variant='outline'>Section actions</Button></DropdownMenuTrigger>
							<DropdownMenuContent align='start'>
								<DropdownMenuItem>Rename section</DropdownMenuItem>
								<DropdownMenuItem>Copy link</DropdownMenuItem>
								<DropdownMenuItem intent='destructive'>Delete section</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<ContextMenu>
							<ContextMenuTrigger asChild>
								<div className='styling-context-target'>Right-click this page row</div>
							</ContextMenuTrigger>
							<ContextMenuContent>
								<ContextMenuItem>Open page</ContextMenuItem>
								<ContextMenuItem>Move to group</ContextMenuItem>
								<ContextMenuItem intent='destructive'>Delete page</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					</div>
					<p className='styling-note'>Menu items support pointer hover, arrow-key navigation, Enter, and Escape.</p>
				</Example>

				<Example title='Tabs and cards'>
					<Tabs defaultValue='account'>
						<TabsList aria-label='Example panels'>
							<TabsTrigger value='account'>Account</TabsTrigger>
							<TabsTrigger value='security'>Security</TabsTrigger>
						</TabsList>
						<TabsContent value='account'>
							<Card>
								<CardHeader>
									<CardTitle>Account</CardTitle>
									<CardDescription>Manage the profile associated with this workspace.</CardDescription>
								</CardHeader>
								<CardContent><div className='styling-row'><Button size='sm'>Save changes</Button><Button size='sm' variant='outline'>Cancel</Button></div></CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='security'><p className='styling-tab-copy'>Security settings are shown in this second tab.</p></TabsContent>
					</Tabs>
				</Example>

				<Example title='Shadcn Sidebar'>
					<SidebarProvider className='styling-sidebar-provider' style={{ height: 250, '--sidebar-width': '15rem' } as CSSProperties}>
						<Sidebar collapsible='none' className='styling-sidebar'>
							<SidebarHeader><span className='styling-sidebar-brand'>Terra Docs</span></SidebarHeader>
							<SidebarContent>
								<SidebarGroup>
									<SidebarGroupLabel>Guides</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu>
											<SidebarMenuItem><SidebarMenuButton isActive>Installation</SidebarMenuButton></SidebarMenuItem>
											<SidebarMenuItem><SidebarMenuButton>Configuration</SidebarMenuButton></SidebarMenuItem>
											<SidebarMenuItem><SidebarMenuButton>Hue and themes</SidebarMenuButton></SidebarMenuItem>
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
							<SidebarFooter><Separator /><span className='styling-sidebar-caption'>Shared from @terra-symposium/styling</span></SidebarFooter>
						</Sidebar>
					</SidebarProvider>
				</Example>
			</div>
		</main>
		</PortalContainerProvider>
		</div>
	);
}
