<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ShippingController extends Controller
{
    public function calcShipping($cep, Request $request)
    {
        $apiUrl = "https://brasilapi.com.br/api/cep/v1/{$cep}";

        // Faz a solicitação HTTP para a API
        $response = Http::get($apiUrl);

        // Verifica se a solicitação foi bem-sucedida (código de resposta 200)
        if ($response->successful()) {
            $data = $response->json();

            // Obtém os parâmetros adicionais da requisição
            $altura = $request->input('altura');
            $largura = $request->input('largura');
            $comprimento = $request->input('comprimento');

            // Calcula o valor do frete com base nas dimensões do produto e no estado
            $valorFrete = $this->calcularValorFrete($data['state'], $altura, $largura, $comprimento);

            // Constrói a resposta no formato desejado
            $result = [
                'cep' => $data['cep'],
                'state' => $data['state'],
                'city' => $data['city'],
                'service' => $data['service'],
                'prazo_entrega' => $this->calcularPrazoEntrega($data['state']),
                'valor_frete' => $valorFrete,
            ];

            // Adiciona 'street' apenas se estiver presente
            if (isset($data['street']) && !empty($data['street'])) {
                $result['street'] = $data['street'];
            }

            return response()->json(['data' => $result]);
        } else {
            return response()->json(['error' => 'Erro ao obter informações de CEP'], $response->status());
        }
    }

    private function calcularPrazoEntrega($state)
    {
        // Lógica para calcular o prazo de entrega com base no estado
        switch ($state) {
            case 'RS':
                return 'até 10 dias úteis';
            case 'SC':
                return '10 a 20 dias';
            default:
                return '20 a 30 dias';
        }
    }

    private function calcularValorFrete($state, $altura, $largura, $comprimento)
{
    // Valor base para RS, SC e outros estados
    $valorProdutoBase = 0;

    // Limite máximo de valor para RS, SC e outros estados
    $limiteMaximoRS = 250;
    $limiteMaximoSC = 400;
    $limiteMaximoOutros = 650;

    // Determina o valor base e o limite máximo com base no estado
    switch ($state) {
        case 'RS':
            $valorProdutoBase = 20;
            $limiteMaximo = $limiteMaximoRS;
            break;
        case 'SC':
            $valorProdutoBase = 40;
            $limiteMaximo = $limiteMaximoSC;
            break;
        default:
            $valorProdutoBase = 60;
            $limiteMaximo = $limiteMaximoOutros;
    }

    // Calcula o valor do frete com base nas dimensões do produto
    $valorFrete = $this->calcularVolumeProduto($altura, $largura, $comprimento) * $valorProdutoBase;

    // Verifica se o valor ultrapassa o limite máximo
    if ($valorFrete > $limiteMaximo) {
        $valorFrete = $limiteMaximo;
    }

    return $valorFrete;
}


    private function calcularVolumeProduto($altura, $largura, $comprimento)
    {
        // Lógica para calcular o volume do produto com base nas dimensões
        return ($altura * $largura * $comprimento) / 6000;
    }
}
