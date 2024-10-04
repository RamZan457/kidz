

import './Summary.css';
import React from 'react';
import PropTypes from 'prop-types';

function Summary({ total, subTotal, discount, tax, onEnterPromoCode, checkPromoCode }) {

    return (
        <section>
            <div className="promotion">
                <label htmlFor="promo-code">Have A Promo Code?</label>
                <input type="text" onChange={onEnterPromoCode} />
                <button type="button" onClick={checkPromoCode} />
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
            </div>

            <div className="checkout">
                <button type="button">Check Out</button>
            </div>
        </section>
    );
}



export default Summary;
