import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, Transition } from '@headlessui/react';

import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
function ProductAttributes() {
  const [error, setError] = useState({ isError: false, message: '' });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalSlug, setModalSlug] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [attributeID, setAttributeID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(name, slug, description, attributeID) {
    setModalName(name);
    setModalSlug(slug);
    setModalDescription(description);
    setAttributeID(attributeID);

    setIsOpen(true);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/dashboard/products/attributes`)
      .then((res) => {
        console.log(res.data.attributes);
        setAttributes(res.data.attributes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleUpdateAttribute = (e) => {
    e.preventDefault();
    axios
      .put('/api/dashboard/products/attributes/', {
        name: modalName,
        slug: modalSlug,
        description: modalDescription,
        attributeID,
      })
      .then((res) => {
        console.log(res.data);

        let newAttributes = attributes.map((attribute) =>
          attribute._id === res.data.updatedAttribute._id
            ? {
                ...attribute,
                name: res.data.updatedAttribute.name,
                slug: res.data.updatedAttribute.slug,
                description: res.data.updatedAttribute.description,
              }
            : attribute
        );

        setAttributes(newAttributes);
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

  const handleDeleteAttribute = (attributeID) => {
    axios
      .delete('/api/dashboard/products/attributes/', {
        data: { attributeID },
      })
      .then((res) => {
        const newAttributes = attributes.filter(
          (attribute) => attribute._id !== res.data.attributeToDelete._id
        );
        setAttributes(newAttributes);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitAttribute = async (e) => {
    e.preventDefault();

    axios
      .post('/api/dashboard/products/attributes/', {
        name,
        slug,
        description,
      })
      .then((res) => {
        console.log(res.data.attribute);
        setAttributes([...attributes, res.data.attribute]);
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

  return (
    <DashboardLayout>
      <div className='product_attributes'>
        <h1>Product Attributes</h1>
        <p className='mb-4'>
          Attributes let you define extra product data, such as size or color.
          You can use these attributes in the shop sidebar.
        </p>
        <div className='attributes_main'>
          <div className='attributes_mainLeft'>
            {error.isError && (
              <div className='alert bg-red-400 p-2 rounded-md '>
                <p>{error.message}</p>
              </div>
            )}
            <form action='' onSubmit={handleSubmitAttribute}>
              <div className='form_group'>
                <label htmlFor='attributeName'>Name</label>
                <input
                  type='text'
                  name='attributeName'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form_group'>
                <label htmlFor='slugName'>Slug</label>
                <input
                  type='text'
                  name='slugName'
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                />
              </div>
              <div className='form_group'>
                <label htmlFor='descriptionName'>Description</label>
                <textarea
                  className='w-full'
                  type='text'
                  name='descriptionName'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className='w-full p-2 bg-indigo-400 text-white'
                type='submit'>
                Add New Attribute
              </button>
            </form>
          </div>
          <div className='attributes_mainRight'>
            <h1>Table to display product attributes</h1>
            {isLoading ? (
              <p className='text-3xl text-red-700'>Loading spinner...</p>
            ) : attributes.length === 0 ? (
              <h1>No attributes</h1>
            ) : (
              attributes?.map((attribute) => (
                <>
                  <div
                    key={attribute.name}
                    className='flex items-start justify-between'>
                    <Link
                      href={`/v1/dashboard/products/attributes/${attribute._id}/${attribute.slug}`}>
                      <a className='font-semibold text-md cursor-pointer'>
                        {attribute.name}
                      </a>
                    </Link>
                    <h1 className='text-left text-md'>{attribute.slug}</h1>
                    <div>
                      {attribute.terms !== 0 &&
                        attribute?.terms?.map((term) => (
                          <p key={term._id}>{term.slug}</p>
                        ))}
                    </div>
                    <div>
                      <h1>Atrribute Actions</h1>
                      <div className='flex items-center space-x-4'>
                        <button type='button'>
                          <EditIcon
                            className='text-indigo-700'
                            onClick={() =>
                              openModal(
                                attribute.name,
                                attribute.slug,
                                attribute.description,
                                attribute._id
                              )
                            }
                          />
                        </button>
                        <button type='button'>
                          <DeleteIcon
                            onClick={() => handleDeleteAttribute(attribute._id)}
                            className='text-red-700'
                          />
                        </button>
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
                                  className='text-lg font-medium leading-6 text-gray-900'>
                                  Payment successful
                                </Dialog.Title>
                                <div className='mt-2'>
                                  <p className='text-sm text-gray-500'>
                                    Your payment has been successfully
                                    submitted. We’ve sent you an email with all
                                    of the details of your order.
                                  </p>
                                  <form action=''>
                                    <div className='form_group'>
                                      <label htmlFor='attributeName'>
                                        Name
                                      </label>
                                      <input
                                        className='w-full'
                                        type='text'
                                        name='attributeName'
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
                                    <div className='mt-4'>
                                      <button
                                        type='submit'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                        onClick={handleUpdateAttribute}>
                                        Update Attribute
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProductAttributes;
