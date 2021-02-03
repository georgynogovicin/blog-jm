import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FormInput from '../form-components/form-input';
import formsErrorHandler from '../../services/helpers/formsErrorHandler';

import classes from './create-artcile-form.module.scss';

const CreateArticleForm = ({ onSubmit, error, edit, articleData, status }) => {
  const [tagsCount, setTagsCount] = useState(1);
  const [tagsValue, setTagsValue] = useState({});

  const isAuth = useSelector((state) => state.isLoggedIn);

  const { title: defaultTitle, description: defaultDescription, body: defaultBody, tagList: defaultTags } = articleData;

  const { register, handleSubmit, errors, setError } = useForm({
    defaultValues: {
      title: defaultTitle,
      description: defaultDescription,
    },
  });

  useEffect(() => {
    if (edit) {
      setTagsCount(defaultTags.length);
      const tagList = defaultTags.reduce((acc, item, i) => {
        acc[`tag${i + 1}`] = item;
        return acc;
      }, {});
      setTagsValue(tagList);
    }
  }, [defaultTags, edit]);

  if (error) {
    formsErrorHandler(error, setError);
  }

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  const addTag = () => {
    setTagsCount((tag) => tag + 1);
  };

  const deleteTag = () => {
    setTagsCount((tag) => tag - 1);
  };

  const tagsList = [];

  for (let i = 1; i <= tagsCount; i++) {
    tagsList.push(
      <div key={i} style={{ display: 'flex', marginBottom: 5 }}>
        <input
          type="text"
          placeholder="tag"
          name={`tag[${i}]`}
          defaultValue={tagsValue[`tag${i}`] || ''}
          ref={register()}
        />
        <button type="button" className={classes['delete-button']} onClick={deleteTag}>
          Delete
        </button>
      </div>
    );
  }

  if (!isAuth) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <form className={classes['create-article']} onSubmit={handleSubmit(onSubmitForm)}>
      <fieldset>
        <legend>{edit ? 'Edit article' : 'Create new article'}</legend>
        <ul role="none">
          <FormInput
            label="Title"
            name="title"
            type="text"
            errors={errors}
            ref={register({ required: { value: true, message: 'Введите заголовок' } })}
          />
          <FormInput
            label="Short description"
            name="description"
            type="text"
            errors={errors}
            ref={register({
              required: { value: true, message: 'Введите описание' },
            })}
          />
          <li>
            <label>
              Text
              <textarea
                name="text"
                placeholder="Text"
                rows={8}
                defaultValue={defaultBody}
                ref={register({ required: { value: true, message: 'Введите текст' } })}
              />
              {errors.text && <p style={{ color: '#F5222D' }}>{errors.text.message}</p>}
            </label>
          </li>
          <li className={classes['create-article__tags']}>
            <label>
              Tags
              <div>
                {tagsList}
                <button type="button" className={classes['add-button']} onClick={addTag}>
                  Add tag
                </button>
              </div>
            </label>
          </li>
          <li style={{ textAlign: 'left' }}>
            <input
              type="submit"
              className={classes['form-button']}
              value={status === 'pending' ? 'Send...' : 'Save'}
              disabled={status === 'pending'}
            />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

CreateArticleForm.defaultProps = {
  error: null,
  articleData: {},
  edit: false,
  status: 'idle',
};

CreateArticleForm.propTypes = {
  error: PropTypes.instanceOf(Array),
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  articleData: PropTypes.instanceOf(Object),
  status: PropTypes.string,
};

export default CreateArticleForm;
