import React from "react"
import { useState } from "react"
import { withStyles } from "@material-ui/core"
import { TStyle } from '../../table/types'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptBrLocale from "date-fns/locale/pt-BR";

const styles: TStyle = (theme: any) => ({
  root: {
    marginTop: theme.spacing(3)
  }
});

interface IDateFilterProps {
  label: string
  setDate: (date: Date | null) => void
  minDate?: Date | null
}

export const DateFilterComponent = ({
  label,
  setDate,
  minDate
}: IDateFilterProps) => {
  const [ value, setValue ] = useState<Date | null>(null)
  const [ open, setOpen ] = useState(false)

  const handleDateChange = (date: Date | null) => {
    setValue(date)
    setDate(date)
    setOpen(false)
  };

  return (
    <MuiPickersUtilsProvider locale={ptBrLocale} utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{margin: 'auto'}}
        minDate={minDate || null}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id={`date-picker-inline-${label}`}
        label={label}
        value={value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export const DateFilter = withStyles(styles)(DateFilterComponent);
