import { React } from 'react';
import { Button } from '@mui/material';

export default function AddExerciseSuccess(props) {
  const handleAddAnotherExercise = () => {
    props.setShowForm(true);
    props.setShowSuccess(false);
  };

  const handleClose = () => {
    props.setShowForm(false);
    props.setShowSuccess(false);
    props.setShowAddExerciseButton(true);
  };

  return (
    <div>
      <h4>Exercise Added Successfully</h4>
      <div style={{ float: 'right' }}>
        <Button
          variant='contained'
          onClick={handleAddAnotherExercise}
          sx={{ marginRight: '10px' }}
        >
          Add Another
        </Button>
        <Button variant='outlined' onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
