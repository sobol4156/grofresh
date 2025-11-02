interface StatusProps {
  status?: 'success'
}

export default function Status({ status = 'success' }: StatusProps) {
  return (
    <div>
      {
        status === 'success' && (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="60" fill="#F0F0F0" />
            <rect x="10" y="10" width="100" height="100" rx="50" fill="white" />
            <path d="M38.6667 60L54.6667 76L81.3334 44" stroke="#00824B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      }

    </div>
  )
}