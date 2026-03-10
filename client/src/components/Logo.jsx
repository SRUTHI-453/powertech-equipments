export default function Logo({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="10" fill="#F5C518" />
      <polygon points="12,12 36,12 12,38" fill="#0D0D0D" />
      <rect x="36" y="12" width="12" height="76" fill="#0D0D0D" />
      <rect x="50" y="12" width="3" height="76" fill="#0D0D0D" />
      <path d="M53,12 H76 Q91,12 91,28 Q91,44 76,44 H53 Z" fill="#0D0D0D" />
      <path d="M58,18 H74 Q85,18 85,28 Q85,38 74,38 H58 Z" fill="#F5C518" />
      <polygon points="53,51 71,44 71,58" fill="#0D0D0D" />
      <polygon points="53,88 88,88 88,63" fill="#0D0D0D" />
    </svg>
  );
}
