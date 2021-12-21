export const getStep = appStep => {
  switch (appStep) {
    case 1:
      return 'Meeting';

    case 2:
      return 'Send To lab';

    case 2:
      return 'Prescription';

    case 4:
      return 'Diagnosis';

    default:
      break;
  }
};
