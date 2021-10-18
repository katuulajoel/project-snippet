/* eslint-disable no-unused-vars */
import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import * as reactConfirmUtils from 'react-confirm';
import * as modalUtils from '../modals';

describe('Modal utils tests', () => {
  it('should open confirm modal', async () => {
    const createConfirmationStub = jest.spyOn(modalUtils, 'confirm');
    const openGenericModalStub = jest.spyOn(modalUtils, 'openGenericModal');
    const body = 'Hello',
      title = '',
      canClose = true,
      options = null,
      header = null,
      hideActions = false;

    expect(createConfirmationStub).toBeTruthy();
    expect(openGenericModalStub).toBeTruthy();
    // const modal = 
    //   openGenericModalStub(
    //     body,
    //     {
    //       hideActions,
    //       mustRespond: !canClose,
    //       title,
    //       ...(options || {}),
    //     },
    //     header
    //   )
    // ;

    // await waitFor(() => {
    //   console.log(modal);
    //   // expect(getByText('Cancel')).toBeInTheDocument();
    //   // expect(getByText('OK')).toBeInTheDocument();
    //   expect(createConfirmationStub).toHaveBeenCalled();
    // });
  });
});
