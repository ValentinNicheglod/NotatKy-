import React, { useState } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import './css/Notes.css';

import Logo from './Logo';

const SideBarHome = ({
  changeRoute,
  collections,
  filterCollections,
  filterTags,
  largeWidth,
  pathname,
  tags,
}) => {
  const [openTags, setOpenTags] = useState(true);
  const [openCollections, setOpenCollections] = useState(false);

  const handleClick = (type) => {
    if (type === 'tag') {
      setOpenTags(!openTags);
    } else {
      setOpenCollections(!openCollections);
    }
  };

  return (
    <div className="row full-height m-0">
      <div className="home-sidebar inicio-logo">
        <Logo />
      </div>
      <div id="side-bar--cont">
        <List component="nav" className="white">
          <ListItem
            button
            id={pathname === '/home' && 'home-select'}
            onClick={() => changeRoute('/home')}
          >
            <ListItemIcon>
              <HomeOutlinedIcon className="white" />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              handleClick('col');
            }}
          >
            <ListItemIcon>
              <CollectionsBookmarkOutlinedIcon className="white" />
            </ListItemIcon>
            <ListItemText primary="Colecciones" />
            {openCollections ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCollections} timeout="auto" unmountOnExit>
            {collections
              && collections.sort().map((collection) => (
                <List component="div" disablePadding key={collection.id}>
                  <ListItem
                    button
                    onClick={() => filterCollections(collection.id)}
                    style={{ paddingLeft: 40 }}
                  >
                    <ListItemIcon>
                      <ListOutlinedIcon className="white" />
                    </ListItemIcon>
                    <ListItemText className="overflow-hidden list-names" primary={collection.name} />
                  </ListItem>
                </List>
              ))}
          </Collapse>

          <ListItem
            button
            onClick={() => {
              handleClick('tag');
            }}
          >
            <ListItemIcon>
              <LocalOfferOutlinedIcon className="white" />
            </ListItemIcon>
            <ListItemText primary="Etiquetas" />
            {openTags ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTags} timeout="auto" unmountOnExit>
            {tags
              && tags.sort().map((tag) => (
                <List component="div" disablePadding key={tag.id}>
                  <ListItem
                    button
                    onClick={() => filterTags(tag.id)}
                    style={{ paddingLeft: 40 }}
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon style={{ color: tag.color }} />
                    </ListItemIcon>
                    <ListItemText className="overflow-hidden list-names" primary={tag.name} />
                  </ListItem>
                </List>
              ))}
          </Collapse>

          <ListItem
            button
            id={pathname === '/archive' && 'home-select'}
            onClick={() => changeRoute('/archive')}
          >
            <ListItemIcon>
              <ArchiveOutlinedIcon className="white" />
            </ListItemIcon>
            <ListItemText primary="Notas archivadas" />
          </ListItem>

          <ListItem
            button
            id={pathname === '/trash' && 'home-select'}
            onClick={() => changeRoute('/trash')}
          >
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon className="white" />
            </ListItemIcon>
            <ListItemText primary="Papelera de reciclaje" />
          </ListItem>
          {!largeWidth && (
            <ListItem button onClick={() => changeRoute('/edit profile')}>
              <ListItemIcon>
                <SettingsOutlinedIcon className="white" />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItem>
          )}
        </List>
      </div>
    </div>
  );
};

export default SideBarHome;
