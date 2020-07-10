import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Link, Grid } from '@material-ui/core'
import { useRegisterServiceValue, useAlertServiceValue } from '../../../services'
import { useHistory } from 'react-router-dom'
import EmailInput from '../input/email.input'
import PasswordInput from '../input/password.input'

export default function RegisterForm () {

  const registerService = useRegisterServiceValue()
  const history = useHistory()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { multipleErrors, success } = useAlertServiceValue()

  const onSubmit = async (values: any) => {
    if (Object.keys(errors).length) {
      return multipleErrors(errors)
    }

    const response = await registerService.register(email, password)
    if (response) {
      success(response.message)
      history.push('/login')
    }
  }

  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='center'>
      <Grid container spacing={1}>
        <Grid container item xs={12} >
          <EmailInput
            errors={errors}
            register={register}
            setEmail={setEmail}
            defaultValue={email}
          />
        </Grid>
        <Grid container item xs={12} >
          <PasswordInput
            errors={errors}
            register={register}
            setPassword={setPassword}
            defaultValue={email}
          />
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            data-testid={'buttonSubmit'}
          >
            Register
          </Button>
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Link
            component="button"
            type="button"
            onClick={() => history.push('/login')}
          >
            Login
          </Link>
        </Grid>
      </Grid>     
    </form>
  )
}
