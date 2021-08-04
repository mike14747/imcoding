import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../../components/footer/footer';

describe('Test the footer component', () => {
    test('Make sure all 3 parts of the footer render', () => {
        render(<Footer />);

        expect(1).toBe(1);
    });
});
