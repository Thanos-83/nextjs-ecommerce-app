import RowContainer from '../../components/ui/RowContainer';

export const metadata = {
  title: 'shop page',
  desrcitpion: 'products page',
};

export default async function Shop() {
  return (
    <RowContainer>
      <div className='flex gap-8 mt-12'>
        <div className='w-[25%]'>
          <h1>Filter</h1>
        </div>
        <div className='w-[75%]'>
          <h1>Products grid</h1>
        </div>
      </div>
    </RowContainer>
  );
}
