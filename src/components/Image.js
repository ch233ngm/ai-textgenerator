import NextImage  from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }) => (
  <NextImage src={`${basePath || ''}${src}`} {...rest} />
)

export default Image
