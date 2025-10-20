import AvatarMui from '@mui/material/Avatar';

interface Props {
  src?: string;
  size?: number
}

export default function Avatar({ src = 'https://avatars.mds.yandex.net/get-entity_search/2050844/1017842602/S600xU_2x', size = 50 }: Props) {
  return <AvatarMui alt="Remy Sharp" src={src} sx={{ width: size, height: size }} />
}