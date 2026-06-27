import { Card } from 'react-bootstrap';
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const EarningsCard = ({ title, amount, trend, type }) => {
  const isPositive = trend >= 0;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="fw-bold mb-0">Rs. {amount.toLocaleString()}</h3>
          </div>
          <div className={`p-2 rounded-circle ${type === 'income' ? 'bg-success bg-opacity-10' : 'bg-primary bg-opacity-10'}`}>
            <FaWallet className={type === 'income' ? 'text-success' : 'text-primary'} size={20} />
          </div>
        </div>
        
        {trend !== undefined && (
          <div className="mt-3 d-flex align-items-center">
            {isPositive ? (
              <FaArrowUp className="text-success me-1" />
            ) : (
              <FaArrowDown className="text-danger me-1" />
            )}
            <small className={isPositive ? 'text-success' : 'text-danger'}>
              {Math.abs(trend)}%
            </small>
            <small className="text-muted ms-1">from last month</small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default EarningsCard;