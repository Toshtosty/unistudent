import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';
import { CheckCircle, Info, XCircle } from 'lucide-react';

export function Toaster() {
	const { toasts } = useToast();

	const ICONS = {
		success: <CheckCircle className="w-6 h-6 text-green-400" />,
		destructive: <XCircle className="w-6 h-6 text-red-400" />,
		default: <Info className="w-6 h-6 text-blue-400" />,
	};

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, ...props }) => {
				return (
					<Toast key={id} {...props}>
						<div className="flex items-start gap-3 w-full">
							{ICONS[props.variant] || ICONS.default}
							<div className="grid gap-1 flex-1">
								{title && <ToastTitle>{title}</ToastTitle>}
								{description && (
									<ToastDescription>{description}</ToastDescription>
								)}
							</div>
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}