import React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import Header from "../components/header";
import '@testing-library/jest-dom';
import MainLayout from "../pages/mainLayout";
import { BrowserRouter } from "react-router-dom";


const renderHeader = () => {
    render(
        <BrowserRouter>
            <MainLayout />
        </BrowserRouter>
    )
};

test('renders Header component within MainLayout', () => {
    render(
        <BrowserRouter>
            <MainLayout />
        </BrowserRouter>
    );
});

describe('Header Component', () => {
    it("renders the header with logo and navigation links", () => {
        renderHeader();

        expect(screen.getByText(/Aspire/i)).toBeInTheDocument();
        expect(screen.getByText(/TECH/i)).toBeInTheDocument();
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
        expect(screen.getByText(/article/i)).toBeInTheDocument();
        expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    });

    it("renders mobile menu when the menu button is clicked", () => {
        renderHeader();

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        const menuButton = screen.getByLabelText(/menu-toggle/i);
        fireEvent.click(menuButton);
        expect(screen.queryByText(/Home/i)).not.toBeInTheDocument();
    })

    it("contains a search input and search button", () => {
        renderHeader();
        expect(screen.getByPlaceholderText(/search here.../i)).toBeInTheDocument();
        expect(screen.getByLabelText('search-button')).toBeInTheDocument();
    })

    it("toogles the mobile menu on click", async() => {
        renderHeader();

        const menuButton = screen.getByLabelText('menu-toggle');

        fireEvent.click(menuButton);

        await screen.findByText(/Home/i, { selector: '.mobile-nav' });
        expect(screen.queryByText(/Home/i, { selector: ".desktop-nav" })).not.toBeInTheDocument();
        expect(screen.queryByText(/Home/i, { selector: ".mobile-nav" })).toBeInTheDocument();

        fireEvent.click(menuButton);

        await screen.findByText(/Home/i, { selector: '.desktop-nav' });
        expect(screen.queryByText(/Home/i, { selector: ".desktop-nav" })).toBeInTheDocument();
        expect(screen.queryByText(/Home/i, { selector: ".mobile-nav" })).not.toBeInTheDocument();

        fireEvent.click(menuButton);

        await screen.findByText(/Home/i, { selector: '.mobile-nav' });
        expect(screen.queryByText(/Home/i, { selector: ".desktop-nav" })).not.toBeInTheDocument();
        expect(screen.queryByText(/Home/i, { selector: ".mobile-nav" })).toBeInTheDocument();
    })
})