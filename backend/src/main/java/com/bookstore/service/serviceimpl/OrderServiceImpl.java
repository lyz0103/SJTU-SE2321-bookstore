package com.bookstore.service.serviceimpl;

import com.bookstore.dao.OrderDao;
import com.bookstore.entity.OrderStat;
import com.bookstore.service.OrderService;
import com.bookstore.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

  OrderDao orderDao;

  @Autowired
  void setOrderDao(OrderDao orderDao) {
    this.orderDao = orderDao;
  }

  @Override
  public List<Order> getOrder() {
    return orderDao.getOrder();
  }

  @Override
  public Order getOrderByOrderId(Integer orderId) {
    return orderDao.getOrderByOrderId(orderId);
  }

  @Override
  public List<Order> getAllOrder() {
    return orderDao.getAllOrder();
  }

  @Override
  public List<OrderStat> getOrderByTime(String t1, String t2) {
    return orderDao.getOrderByTime(t1, t2);
  }

  @Override
  public List<OrderStat> getAllOrderByTime(String t1, String t2) {
    return orderDao.getAllOrderByTime(t1, t2);
  }

}
