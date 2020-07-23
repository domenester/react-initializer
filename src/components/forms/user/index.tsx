import React from 'react'
import { useForm } from 'react-hook-form'
import EmailInput from '../input/email.input'
import { Grid, withStyles } from '@material-ui/core'
import { useUserFormStateValue, useModalStateValue, useUserListStateValue } from '../../../shared/state-handler'
import { useUserServiceValue, useAlertServiceValue } from '../../../services'
import PasswordInput from '../input/password.input'
import TextInput from '../input/text.input'
import { TStyle } from '../../../shared/table/types'
import { UserModel } from '../../../models'
import { ButtonSuccess, ButtonError } from '../../../shared/button'
import { useUserFetch } from '../../../hooks'

const styles: TStyle = (theme: any) => ({
  root: {
    width: '100%',
    padding: '2%',
    marginTop: theme.spacing(3)
  }
});

interface IHandleForm {
  onSubmitTest?: () => void
  classes: any
}

function UserHandleFormComponent ({onSubmitTest}: IHandleForm) {

  const { multipleErrors, success } = useAlertServiceValue()

  const { update, create } = useUserServiceValue()

  const userFormState = useUserFormStateValue().state
  const userFormDispatch = useUserFormStateValue().dispatch

  const modalDispatch = useModalStateValue().dispatch

  const { state: { take } } = useUserListStateValue()
  const userListDispatch = useUserListStateValue().dispatch

  const fetch = useUserFetch()
  let {
    id, name, username, email, password
  } = userFormState

  const setName = (value: string) => userFormDispatch({type: 'setName', payload: value})
  const setUsername = (value: string) => userFormDispatch({type: 'setUsername', payload: value})  
  const setEmail = (value: string) => userFormDispatch({type: 'setEmail', payload: value})  
  const setPassword = (value: string) => userFormDispatch({type: 'setPassword', payload: value})
  const { handleSubmit, register, reset, errors } = useForm();

  const onCancel = () => {
    userFormDispatch({type: 'resetState', payload: null})
    reset()
  }

  const onSubmit = async (values: any) => {

    if (Object.keys(errors).length) {
      return multipleErrors(errors)
    }

    const bodyPassword = !id ? password : undefined
    const bodyId = id ? id: undefined

    const body = new UserModel(
      name,
      email,
      username,
      ['owner'],
      bodyPassword,
      bodyId
    )

    const createOrUpdate = id ? update : create
    const response = await createOrUpdate(body)
    if (response) {
      success(response.message)
      onCancel()
      userListDispatch({type: 'resetState', payload: null})
      await fetch(take, 0, false)
      modalDispatch({type: 'close', payload: null})
    }
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmitTest || onSubmit)}
        className='center'
        data-testid='form'
      >
        <Grid container spacing={1}>
          <Grid container item xs={12} md={6} sm={12}>
            <TextInput
              errors={errors}
              register={register}
              setValue={setName}
              defaultValue={name}
              name='name'
              label='Nome'
            />
          </Grid>
          <Grid container item xs={12} md={6} sm={12}>
            <TextInput
              errors={errors}
              register={register}
              setValue={setUsername}
              defaultValue={username}
              name='username'
              label='Username'
            />
          </Grid>
          <Grid container item xs={12} md={6} sm={12}>
            <EmailInput
              errors={errors}
              register={register}
              setEmail={setEmail}
              defaultValue={email}
            />
          </Grid>
          <Grid container item xs={12} md={6} sm={12}>
            <PasswordInput
              errors={errors}
              register={register}
              setPassword={setPassword}
              defaultValue={password || ''}
              disabled={!!id}
            />
          </Grid>
          <Grid container item xs={12} justify='flex-end'>
            <ButtonSuccess
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              data-testid={'buttonSubmit'}
            >
              Salvar
            </ButtonSuccess>
            <ButtonError
              onClick={onCancel}
              type='button'
              variant='contained'
              size='large'
              data-testid={'buttonCancel'}
            >
              Cancelar
            </ButtonError>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default withStyles(styles)(UserHandleFormComponent);