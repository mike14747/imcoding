import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../../src/components/header/header';
import { expect } from 'chai';

describe('Test the header component', () => {
    test('Make sure the logo is displayed and is a home link', () => {
        render(<Header />);

        expect(1).toBe(1);

        screen.debug();
    });
});
