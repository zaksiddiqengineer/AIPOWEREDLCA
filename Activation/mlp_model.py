import torch
import torch.nn as nn
from collections import OrderedDict

class MLP(nn.Module):
    def __init__(self, drop_out=0.4, num_hidden_layers=3, num_neurons=256, num_input=256, active='ReLu'):
        super().__init__()

        # Define activation function dynamically based on the 'active' parameter
        def get_activation(name):
            if name == 'Sigmoid':
                return nn.Sigmoid()
            elif name == 'Tanh':
                return nn.Tanh()
            else:
                return nn.ReLU()

        layers = [
            ('0_fc', nn.Linear(num_input, num_neurons)),
            ('0_BN', nn.BatchNorm1d(num_neurons)),
            ('0_act', get_activation(active)),
            ('0_dropout', nn.Dropout(drop_out))
        ]

        for i in range(1, num_hidden_layers):
            layers += [
                (f'{i}_fc', nn.Linear(num_neurons, num_neurons)),
                (f'{i}_BN', nn.BatchNorm1d(num_neurons)),
                (f'{i}_act', get_activation(active)),
                (f'{i}_dropout', nn.Dropout(drop_out))
            ]

        # Adding the output layer outside the loop
        layers.append(('out_layer', nn.Linear(num_neurons, 1)))  # Output layer with one neuron

        self.net = nn.Sequential(OrderedDict(layers))

    def forward(self, x):
        return self.net(x)