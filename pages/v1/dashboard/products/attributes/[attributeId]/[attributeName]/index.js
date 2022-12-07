import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../../../../dashboard_components/DashboardLayout';

function ProductAttributeTerms() {
  const router = useRouter();
  // console.log(router.query);
  const [error, setError] = useState({ isError: false, message: '' });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalSlug, setModalSlug] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [termID, setTermID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(name, slug, description, termId) {
    setModalName(name);
    setModalSlug(slug);
    setModalDescription(description);
    setTermID(termId);
    console.log(termId);

    setIsOpen(true);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `/api/dashboard/products/attributes/${router.query.attributeId}/terms`
      )
      .then((res) => {
        console.log(res.data.terms);
        setTerms(res.data.terms);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [router.query.attributeId]);

  // console.log('Terms: ', terms);

  const handleSubmitTerm = async (e) => {
    e.preventDefault();
    axios
      .post(
        `/api/dashboard/products/attributes/${router.query.attributeId}/terms`,
        {
          name,
          slug,
          description,
        }
      )
      .then((res) => {
        console.log(res.data);
        setTerms([...terms, res.data.term]);
        setError({ ...error, isError: false });
        setName('');
        setSlug('');
        setDescription('');
      })
      .catch((err) => {
        setError({
          ...error,
          isError: true,
          message: err.response.data.errorMsg,
        });
        console.log(error);
      });
  };

  const handleUpdateTerm = async (e) => {
    e.preventDefault();
    axios
      .put(
        `/api/dashboard/products/attributes/${router.query.attributeId}/terms`,
        {
          name: modalName,
          slug: modalSlug,
          description: modalDescription,
          termID,
        }
      )
      .then((res) => {
        console.log(res.data);

        let newAttributeTerms = terms.map((term) =>
          term._id === res.data.updatedTerm._id
            ? {
                ...term,
                name: res.data.updatedTerm.name,
                slug: res.data.updatedTerm.slug,
                description: res.data.updatedTerm.description,
              }
            : term
        );

        setTerms(newAttributeTerms);
        closeModal();
      })
      .catch((err) => {
        // setError({
        //   ...error,
        //   isError: true,
        //   message: err.response.data.errorMsg,
        // });
        console.log(err);
      });
    closeModal();
  };

  const handleDeleteTerm = async (id) => {
    setIsLoading(true);
    axios
      .delete(
        `/api/dashboard/products/attributes/${router.query.attributeId}/terms`,
        {
          data: { termID: id },
        }
      )
      .then((res) => {
        console.log(res);
        const newTerms = terms.filter(
          (term) => term._id !== res.data.deletedTerm._id
        );
        setTerms(newTerms);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <DashboardLayout>
      <div className='product_attributes'>
        <h1>Product Attribute Terms </h1>
        <div className='attributes_main'>
          <div className='attributes_mainLeft'>
            {error.isError && (
              <div className='alert bg-red-400 p-2 rounded-md '>
                <p>{error.message}</p>
              </div>
            )}
            <form action=''>
              <div className='form_group'>
                <label htmlFor='termName'>Name</label>
                <input
                  type='text'
                  name='termName'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form_group'>
                <label htmlFor='slugName'>Slug</label>
                <input
                  type='text'
                  name='termSlug'
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                />
              </div>
              <div className='form_group'>
                <label htmlFor='descriptionName'>Description</label>
                <textarea
                  type='text'
                  name='termDescription'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type='submit' onClick={handleSubmitTerm}>
                Add New Term
              </button>
            </form>
          </div>
          <div className='attributes_mainRight flex-1'>
            <h1>Table to display product terms</h1>
            {terms?.length === 0 ? (
              <h1>No terms</h1>
            ) : (
              terms?.map((term) => (
                <>
                  <div className='flex items-center justify-between'>
                    <h1 key={term?.name} className='font-semibold text-md'>
                      {term?.name}
                    </h1>
                    <h1 key={term?.slug} className='text-left text-md'>
                      {term?.slug}
                    </h1>
                    <div>
                      <h1>Term Actions</h1>
                      <div className='flex items-center space-x-4'>
                        <button>
                          <EditIcon
                            className='text-indigo-700'
                            onClick={() =>
                              openModal(
                                term?.name,
                                term?.slug,
                                term?.description,
                                term?._id
                              )
                            }
                          />
                        </button>
                        <button>
                          <DeleteIcon
                            onClick={() => handleDeleteTerm(term?._id)}
                            className='text-red-700'
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as='div'
                      className='relative z-10'
                      onClose={closeModal}>
                      <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-black bg-opacity-10' />
                      </Transition.Child>

                      <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                          <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'>
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                              <Dialog.Title
                                as='h3'
                                className='text-xl font-medium leading-6 text-gray-900'>
                                Update Attribute Term
                              </Dialog.Title>
                              <div className='mt-2'>
                                <p className='text-sm text-gray-500 mb-2'>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Assumenda saepe quis
                                  voluptatibus ipsa minima modi dolor accusamus
                                  sit impedit. Asperiores?
                                </p>
                                <form action=''>
                                  <div className='form_group'>
                                    <label htmlFor='termName'>Name</label>
                                    <input
                                      className='w-full'
                                      type='text'
                                      name='termName'
                                      value={modalName}
                                      onChange={(e) =>
                                        setModalName(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className='form_group'>
                                    <label htmlFor='slugName'>Slug</label>
                                    <input
                                      className='w-full'
                                      type='text'
                                      name='slugName'
                                      onChange={(e) =>
                                        setModalSlug(e.target.value)
                                      }
                                      value={modalSlug}
                                    />
                                  </div>
                                  <div className='form_group'>
                                    <label htmlFor='descriptionName'>
                                      Description
                                    </label>
                                    <textarea
                                      className='w-full'
                                      type='text'
                                      name='descriptionName'
                                      value={modalDescription}
                                      onChange={(e) =>
                                        setModalDescription(e.target.value)
                                      }
                                    />
                                  </div>
                                  <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 mt-4 w-full px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                    onClick={handleUpdateTerm}>
                                    Update Term
                                  </button>
                                </form>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProductAttributeTerms;
