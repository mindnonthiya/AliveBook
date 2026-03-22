import React from 'react';

interface IconProps {
  className?: string;
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const BookIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M4.75 5.75A2.75 2.75 0 0 1 7.5 3h11.75v16.75H7.5a2.75 2.75 0 0 0-2.75 2.75V5.75Z" />
    <path d="M7.5 3v16.75" />
    <path d="M10.75 7.5h5.5" />
    <path d="M10.75 11h5.5" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 20.25s-7-4.35-7-9.4a4.1 4.1 0 0 1 7-2.69 4.1 4.1 0 0 1 7 2.69c0 5.05-7 9.4-7 9.4Z" />
  </svg>
);

export const CartIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="9" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
    <path d="M3.75 4.5h2l2.35 9.2a1 1 0 0 0 .96.75h8.49a1 1 0 0 0 .97-.76l1.48-6.19H7.1" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="m12 3 1.25 3.75L17 8l-3.75 1.25L12 13l-1.25-3.75L7 8l3.75-1.25L12 3Z" />
    <path d="m18.25 13.75.75 2.25 2.25.75-2.25.75-.75 2.25-.75-2.25-2.25-.75 2.25-.75.75-2.25Z" />
    <path d="M5.25 14.5 6 16.75l2.25.75L6 18.25 5.25 20.5 4.5 18.25l-2.25-.75L4.5 16.75l.75-2.25Z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 5.5v13" />
    <path d="M5.5 12h13" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M4.75 19.25 9 18l9-9a1.94 1.94 0 1 0-2.75-2.75l-9 9-1.5 4Z" />
    <path d="m13.5 6.5 4 4" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M4.75 7.25h14.5" />
    <path d="M9.25 3.75h5.5" />
    <path d="m7 7.25.7 11.2a1 1 0 0 0 1 .8h6.6a1 1 0 0 0 1-.8l.7-11.2" />
    <path d="M10 11.25v4.5" />
    <path d="M14 11.25v4.5" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="4.5" rx="1.5" />
    <rect x="13" y="11" width="7" height="9" rx="1.5" />
    <rect x="4" y="13.5" width="7" height="6.5" rx="1.5" />
  </svg>
);
