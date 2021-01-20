import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-components/form-input';
import request from '../../services/api/api';
import { setError as setErrorToState, setSingleArticle } from '../../services/actions/actions';
import { redirectToSingleArticle } from '../../services/routes/routes';
import formsErrorHandler from '../../services/helpers/formsErrorHandler';

import classes from './create-artcile-form.module.scss';

const CreateArticleForm = () => {
  const [tagsCount, setTagsCount] = useState(0);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.currentUser.token);
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  const isAuth = useSelector((state) => state.isLoggedIn);

  const onSubmit = async (data) => {
    try {
      const res = await request.createArticle(data, authToken);

      if (res.article) {
        const { slug } = res.article;
        dispatch(setSingleArticle(res.article));
        history.push(redirectToSingleArticle(slug));
      }

      if (res.errors) {
        formsErrorHandler(res.errors, setError);
      }
    } catch (error) {
      dispatch(setErrorToState(error));
    }
  };

  const addTag = () => {
    setTagsCount((tag) => tag + 1);
  };

  const deleteTag = () => {
    setTagsCount((tag) => tag - 1);
  };

  const tagsList = [];

  for (let i = 0; i <= tagsCount; i++) {
    tagsList.push(
      <div key={i} style={{ display: 'flex', marginBottom: 5 }}>
        <input type="text" placeholder="tag" name={`tag[${i}]`} ref={register()} />
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
    <form className={classes['create-article']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Create new article</legend>
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
            <input type="submit" className={classes['form-button']} value="Save" />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default CreateArticleForm;
