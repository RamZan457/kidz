

import './Summary.css';
import React from 'react';
import PropTypes from 'prop-types';

function Summary({ total, subTotal, discountError, discount, tax, onEnterPromoCode, checkPromoCode }) {

    return (
        <section className='summary-container'>
            <div className="promotion">
                <label htmlFor="promo-code">Have A Promo Code?</label>
                <input type="text" onKeyDown={onEnterPromoCode} onChange={onEnterPromoCode} />
                <button type="button" onClick={checkPromoCode} />
                <p className="discount-error">{discountError}</p>
            </div>

            <div className="summary">
                <ul>
                    <li>
                        Subtotal <span>Rs.{subTotal}</span>
                    </li>
                    {discount > 0 && (
                        <li>
                            Discount <span style={{ textDecoration: "overline red 3px" }}>- Rs.{discount}</span>
                        </li>
                    )}
                    <li>
                        Tax <span style={{ textDecoration: "overline black 3px" }}>+ Rs.{tax}</span>
                    </li>
                    <li className="total">
                        Total <span>Rs.{total}</span>
                    </li>
                </ul>
                <div className="checkout">
                    <button type="button">Check Out</button>
                </div>
            </div>
        </section>
    );
}



export default Summary;
