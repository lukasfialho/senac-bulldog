import React from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CreateIcon from '@material-ui/icons/Create';
import {Produtos} from "../../models/produtos";

interface OwnProps {
    produto: Produtos;
    editarProduto(): void;
    perguntasRespostas?(): void;
}

type Props = OwnProps;
export default function ProductListMenu({ produto, editarProduto, perguntasRespostas }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onSelectOption = (funcao: any) => {
        funcao();
        handleClose();
    }

    return (
      <div>
          <IconButton
              aria-label="opcoes"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
          >
              <MoreVertIcon />
          </IconButton>
          <Menu
              id="opcoes-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
          >
              {
                  produto.status ?
                      (
                          <MenuItem disabled>
                              <CheckBoxIcon /> Produto está ativo
                          </MenuItem>
                      ) :
                      (
                          <MenuItem disabled>
                              <CheckBoxOutlineBlankIcon /> Produto está inativo
                          </MenuItem>
                      )
              }
              <MenuItem onClick={() => onSelectOption(editarProduto)}>
                  <CreateIcon /> Editar produto
              </MenuItem>
              <MenuItem onClick={() => onSelectOption(perguntasRespostas)}>
                  <QuestionAnswerIcon /> Gerenciar perguntas e respostas
              </MenuItem>
          </Menu>
      </div>
    );
}