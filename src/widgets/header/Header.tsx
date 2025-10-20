import Avatar from '@/shared/ui/Avatar'

export default function Header() {
  return (
    <header>
      <div className='flex items-center gap-2.5'>
        <Avatar />
        <div className='flex flex-col justify-between'>
          <p>Welcome Back</p>
          <b>Kevin henderson</b>
        </div>
      </div>

    </header>)
}