import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, useMediaQuery } from '@material-ui/core';
import { ExpandLess, ExpandMore, Dashboard, Payment } from '@material-ui/icons';
import { Book, BookOnline, Category, ContactMail, FeedOutlined, OfflineBolt, OnlinePredictionTwoTone, RequestPageRounded, RequestQuote, SmartDisplayRounded, TextsmsTwoTone } from '@mui/icons-material';
import { PiChalkboardTeacher, PiStudent } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const listItemText = (text: string) => {
    return isSmallScreen ? <ListItemText primary={text} /> : <ListItemText primary={text} />;
  };

  const listItemIcon = (icon: React.ReactElement) => {
    return isSmallScreen ? null : <ListItemIcon>{icon}</ListItemIcon>;
  };

  const listItem = (to: string, text: string) => {
    return (
      <ListItem button component={Link} to={to}>
        {listItemText(text)}
      </ListItem>
    );
  };

  return (
    <div className="bg-white border-r pt-4 min-h-screen text-gray-600">
      <Link className="text-center text-blue-600  bold ml-4 px-2 rounded text-3xl" to="/">
        Bristol
      </Link>
      <List>
        {listItem('/dashboard', 'Home')}
       
     
          <List component="div" disablePadding>
            {listItem('oflinecategory', 'Categories')}
            {listItem('Teachers', 'Teachers')}
            {listItem('salary', 'Salary')}
            {listItem('oflinecources', 'Courses')}
            {listItem('Subcource', 'Sub Courses')}
            {listItem('students', 'Students')}
            {listItem('OFlineenrollment', 'Enrollment')}
            {listItem('exams' ,'Exams')}
            {listItem('fees', 'Paid Fees')}
            {listItem('feemonth','Fees')}
          </List>
      
    
      </List>
    </div>
  );
};

export default Sidebar;