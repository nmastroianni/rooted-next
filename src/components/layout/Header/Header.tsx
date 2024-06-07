import { createClient } from '@/prismicio'
import Navbar from '@/components/layout/Header/Navbar'
import { LayoutDocumentData } from '../../../../prismicio-types'

const Header = async () => {
  const client = createClient()
  const layout = await client.getSingle('layout', {
    fetchLinks: ['sub_menu.slices', 'sub_menu.slices1', 'sub_menu.slices2'],
  })
  const settings = await client.getSingle('settings')
  const layoutData: LayoutDocumentData = layout.data
  const { data } = settings

  return (
    <>
      <Navbar data={layoutData} settings={data} />
    </>
  )
}

export default Header
