import AvatarMui from '@mui/material/Avatar';

interface Props {
  src?: string;
  size?: number
}

export default function Avatar({ src = '/images/user-no-photo.png', size = 50 }: Props) {
  return <AvatarMui alt="Remy Sharp" src={src} sx={{ width: size, height: size }} />
}