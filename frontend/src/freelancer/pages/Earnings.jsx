import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Table } from 'react-bootstrap';
import EarningsCard from '../components/EarningsCard';
import API from '../../api/axiosConfig';

const Earnings = () => {
  const [earnings, setEarnings] = useState({
    total: 0,
    available: 0,
    pending: 0,
    withdrawn: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await API.get('/providers/earnings');
      setEarnings(res.data);
      setTransactions(res.data.transactions || []);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Earnings</h1>
          <p className="text-muted">Track your income and withdrawals</p>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <EarningsCard 
            title="Total Earnings" 
            amount={earnings.total} 
            trend={12}
            type="income"
          />
        </Col>
        <Col md={3}>
          <EarningsCard 
            title="Available" 
            amount={earnings.available}
            type="primary"
          />
        </Col>
        <Col md={3}>
          <EarningsCard 
            title="Pending" 
            amount={earnings.pending}
            type="primary"
          />
        </Col>
        <Col md={3}>
          <EarningsCard 
            title="Withdrawn" 
            amount={earnings.withdrawn}
            type="primary"
          />
        </Col>
      </Row>

      {/* Withdraw Button */}
      {earnings.available > 0 && (
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm bg-primary text-white">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Available for Withdrawal</h5>
                  <h2 className="mb-0">Rs. {earnings.available.toLocaleString()}</h2>
                </div>
                <button className="btn btn-light btn-lg">
                  Withdraw Now
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Transactions Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="fw-bold mb-4">Transaction History</h4>
              
              {transactions.length === 0 ? (
                <p className="text-muted text-center py-4">No transactions yet</p>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx._id}>
                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                        <td>{tx.description}</td>
                        <td>
                          <span className={`badge ${tx.type === 'income' ? 'bg-success' : 'bg-secondary'}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className={tx.type === 'income' ? 'text-success' : 'text-danger'}>
                          {tx.type === 'income' ? '+' : '-'} Rs. {tx.amount}
                        </td>
                        <td>
                          <span className={`badge ${tx.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Earnings;