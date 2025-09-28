import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from '../components/TransactionInfoCard';
import moment from 'moment';

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>{title}</h5>
                <button className='card-btn' onClick={onMore}>
                    More <ArrowRight className='text-base' size={15} />
                </button>
            </div>
            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map(transaction => (
                    <TransactionInfoCard
                        key={transaction.id}
                        title={transaction.name}
                        icon={transaction.icon}
                        date={moment(transaction.date).format("Do MMM YYYY")}
                        amount={transaction.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions
