import AvatarMui from '@mui/material/Avatar';

interface Props {
  src?: string;
}

export default function Avatar({ src = 'https://avatars.mds.yandex.net/get-entity_search/2050844/1017842602/S600xU_2x' }: Props){
  return <AvatarMui alt="Remy Sharp" src={src} />
}