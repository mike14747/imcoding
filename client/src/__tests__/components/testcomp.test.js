import React from 'react';
import { render, screen } from '@testing-library/react';

import Testcomp from '../../components/testcomp';

test('make sure the h3 renders', () => {
    render(<Testcomp />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('This is a test component');
});
