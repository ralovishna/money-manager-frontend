import { Download, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import TransactionInfoCard from "../TransactionInfoCard";
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {

    const [emailLoading, setEmailLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const handleEmail = async () => {
        setEmailLoading(true);
        try {
            await onEmail();
        } finally {
            setEmailLoading(false);
        }
    }

    const handleDownload = async () => {
        setDownloadLoading(true);
        try {
            await onDownload();
        } finally {
            setDownloadLoading(false);
        }
    }

    return (
        <div className="card p-4 rounded-xl border border-gray-200 shadow-sm bg-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Expense Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={handleEmail}
                        className="card-btn"
                        disabled={emailLoading}
                    >
                        {emailLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin text-cyan-700" /> Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="mr-1 text-purple-500" />
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Email
                                </span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="card-btn"
                        disabled={downloadLoading}
                    >
                        {downloadLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin text-cyan-700" /> Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={15} className="mr-1 text-purple-500" />
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Download
                                </span>
                            </>
                        )}

                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* display the expense list */}
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type={"expense"}
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
