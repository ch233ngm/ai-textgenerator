import Link from 'next/link'

// This a href you can replace with your own
const Tag = ({ text }) => {
  return (
    <Link
      href='#'
      className="mr-3 text-sm font-medium uppercase text-pink-500 hover:text-pink-600"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
