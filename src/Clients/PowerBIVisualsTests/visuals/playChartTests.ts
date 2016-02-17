﻿/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbitests {

    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import DataViewMatrix = powerbi.DataViewMatrix;
    import PlayChart = powerbi.visuals.PlayChart;

    powerbitests.mocks.setLocale();

    ///////////////////
    // Matrix DataViews
    ///////////////////

    // data types
    let dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
    let dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);

    // DataViewMetadataColumns
    let playSource: DataViewMetadataColumn = { displayName: "Month", queryName: "Month1", type: dataTypeString, index: 0 };
    let categorySource: DataViewMetadataColumn = { displayName: "RowGroup2", queryName: "RowGroup2", type: dataTypeString, index: 1 };
    let seriesSource: DataViewMetadataColumn = { displayName: "ColGroup1", queryName: "ColGroup1", type: dataTypeString, index: 2 };
    let measureSource1: DataViewMetadataColumn = { displayName: "Measure1", queryName: "Measure1", type: dataTypeNumber, isMeasure: true, index: 3 };
    let measureSource2: DataViewMetadataColumn = { displayName: "Measure2", queryName: "Measure2", type: dataTypeNumber, isMeasure: true, index: 4 };
    let measureSource3: DataViewMetadataColumn = { displayName: "Measure3", queryName: "Measure3", type: dataTypeNumber, isMeasure: true, index: 5 };

    //          | MeasureX | MeasureY | MeasureZ + MeasureX | MeasureY | MeasureZ |
    // |+++++++ +--------------------------------+--------------------------------+
    // | Jan    |      100 |      200 |      300 +      50 |     75   |     100   |
    // |------- |--------------------------------+--------------------------------|
    // | Feb    |      400 |      500 |      600 +     125 |     150  |    175    |
    // |------- |--------------------------------+--------------------------------|
    let matrixPlay: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 },
                        1: { value: 200, valueSourceIndex: 1 },
                        2: { value: 300, valueSourceIndex: 2 },
                        3: { value: 50 },
                        4: { value: 75, valueSourceIndex: 1 },
                        5: { value: 100, valueSourceIndex: 2 },
                    },
                    value: 'Jan',
                }, {
                        level: 0,
                        values: {
                            0: { value: 400 },
                            1: { value: 500, valueSourceIndex: 1 },
                            2: { value: 600, valueSourceIndex: 2 },
                            3: { value: 125 },
                            4: { value: 150, valueSourceIndex: 1 },
                            5: { value: 175, valueSourceIndex: 2 },
                        },
                        value: 'Feb',
                    }]
            },
            levels: [{ sources: [playSource] }]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                    }, {
                        level: 0,
                        levelSourceIndex: 1
                    }, {
                        level: 0,
                        levelSourceIndex: 2
                    }
                ]
            },
            levels: [
                {
                    sources: [measureSource1, measureSource2, measureSource3]
                }
            ]
        },
        valueSources: [measureSource1, measureSource2, measureSource3]
    };
    //let matrixPlayDataView: powerbi.DataView = {
    //    metadata: { columns: [playSource, measureSource1, measureSource2, measureSource3] },
    //    matrix: matrixPlay
    //};

    //          | -----------------------------------------------------------------
    //          |             Series1            |             Series2            |
    //          |--------------------------------|--------------------------------|
    //          | MeasureX | MeasureY | MeasureZ | MeasureX | MeasureY | MeasureZ |
    // |+++++++ +--------------------------------+--------------------------------+
    // | Jan    |      100 |      200 |      300 |      50 |     75   |     100   |
    // |------- |--------------------------------+--------------------------------|
    // | Feb    |      400 |      500 |      600 |     125 |     150  |    175    |
    // |------- |--------------------------------+--------------------------------|
    let matrixSeriesAndPlay: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                            value: 'Jan',
                            level: 0,
                            values: {
                                0: { value: 100 },
                                1: { value: 200, valueSourceIndex: 1 },
                                2: { value: 300, valueSourceIndex: 2 },
                                3: { value: 50 },
                                4: { value: 75, valueSourceIndex: 1 },
                                5: { value: 100, valueSourceIndex: 2 },
                            },
                        }, {
                            value: 'Feb',
                            level: 0,
                            values: {
                                0: { value: 400 },
                                1: { value: 500, valueSourceIndex: 1 },
                                2: { value: 600, valueSourceIndex: 2 },
                                3: { value: 125 },
                                4: { value: 150, valueSourceIndex: 1 },
                                5: { value: 175, valueSourceIndex: 2 },
                            },
                        }]
            },
            levels: [{ sources: [playSource] }]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Series1",
                        children: [
                            { level: 1 },
                            { level: 1, levelSourceIndex: 1 },
                            { level: 1, levelSourceIndex: 2 }
                        ]
                    },
                    {
                        level: 0,
                        value: "Series2",
                        children: [
                            { level: 1 },
                            { level: 1, levelSourceIndex: 1 },
                            { level: 1, levelSourceIndex: 2 }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [seriesSource] },
                { sources: [measureSource1, measureSource2, measureSource3] }
            ]
        },
        valueSources: [measureSource1, measureSource2, measureSource3]
    };
    //let matrixSeriesAndPlayDataView: powerbi.DataView = {
    //    metadata: { columns: [seriesSource, playSource, measureSource1, measureSource2, measureSource3] },
    //    matrix: matrixSeriesAndPlay
    //};

    //                   | MeasureX | MeasureY | MeasureZ |
    // |+++++++|++++++++++---------------------------------
    // | Jan   | XBOX    |      100 |      200 |      300 |
    // |       | Azure   |      550 |      155 |      51  |
    // |       | Office  |      330 |      133 |      31  |
    // |-------|---------+---------------------------------
    // | Feb   | XBOX    |       40 |       50 |       60 |
    // |       | Azure   |      770 |      177 |       71 |
    // |       | Office  |      440 |      144 |       41 |
    // |--------------------------------------------------|
    let matrixCategoryAndPlay: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: 'Jan',
                    children: [
                        {
                            level: 1,
                            values: {
                                0: { value: 100 },
                                1: { value: 200, valueSourceIndex: 1 },
                                2: { value: 300, valueSourceIndex: 2 },
                            },
                            value: 'XBOX'
                        }, {
                            level: 1,
                            values: {
                                0: { value: 550 },
                                1: { value: 155, valueSourceIndex: 1 },
                                2: { value: 51, valueSourceIndex: 2 },
                            },
                            value: 'Azure'
                        }, {
                            level: 1,
                            values: {
                                0: { value: 330 },
                                1: { value: 133, valueSourceIndex: 1 },
                                2: { value: 31, valueSourceIndex: 2 },
                            },
                            value: 'Office'
                        }]
                },
                    {
                        level: 0,
                        value: 'Feb',
                        children: [
                            {
                                level: 1,
                                values: {
                                    0: { value: 40 },
                                    1: { value: 50, valueSourceIndex: 1 },
                                    2: { value: 60, valueSourceIndex: 2 },
                                },
                                value: 'XBOX'
                            }, {
                                level: 1,
                                values: {
                                    0: { value: 770 },
                                    1: { value: 177, valueSourceIndex: 1 },
                                    2: { value: 71, valueSourceIndex: 2 },
                                },
                                value: 'Azure'
                            }, {
                                level: 1,
                                values: {
                                    0: { value: 440 },
                                    1: { value: 144, valueSourceIndex: 1 },
                                    2: { value: 41, valueSourceIndex: 2 },
                                },
                                value: 'Office'
                            }]
                    }]
            },
            levels: [{ sources: [playSource] }, { sources: [categorySource] }]
        },
        columns: {
            root: {
                children: [
                    { level: 0 },
                    { level: 0, levelSourceIndex: 1 },
                    { level: 0, levelSourceIndex: 2 }
                ]
            },
            levels: [
                {
                    sources: [measureSource1, measureSource2, measureSource3]
                }
            ]
        },
        valueSources: [measureSource1, measureSource2, measureSource3]
    };
    //let matrixCategoryAndPlayDataView: powerbi.DataView = {
    //    metadata: { columns: [categorySource, playSource, measureSource1, measureSource2, measureSource3] },
    //    matrix: matrixCategoryAndPlay
    //};


    //                   | -----------------------------------------------------------------
    //                   |             Series1            |             Series2            |
    //                   |--------------------------------|--------------------------------|
    //                   | MeasureX | MeasureY | MeasureZ | MeasureX | MeasureY | MeasureZ |
    // |+++++++|++++++++++------------------------------------------------------------------
    // | Jan   | XBOX    |      100 |      200 |      300 |      105 |      205 |      305 |
    // |       | Azure   |      440 |      144 |       41 |      555 |      155 |       55 |
    // |       | Office  |      330 |      133 |       31 |      335 |      135 |       35 |
    // |-------|---------+------------------------------------------------------------------
    // | Feb   | XBOX    |       40 |       50 |       60 |       45 |       55 |       65 |
    // |       | Azure   |      770 |      177 |       71 |      775 |      175 |       75 |
    // |       | Office  |      440 |      144 |       41 |      445 |      145 |       45 |
    // |--------------------------------------------------|--------------------------------|
    let matrixSeriesAndCategoryAndPlay: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: 'Jan',
                    children: [
                        {
                            level: 1,
                            values: {
                                0: { value: 100 },
                                1: { value: 200, valueSourceIndex: 1 },
                                2: { value: 300, valueSourceIndex: 2 },
                                3: { value: 105 },
                                4: { value: 205, valueSourceIndex: 1 },
                                5: { value: 305, valueSourceIndex: 2 },
                            },
                            value: 'XBOX'
                        }, {
                            level: 1,
                            values: {
                                0: { value: 440 },
                                1: { value: 144, valueSourceIndex: 1 },
                                2: { value: 41, valueSourceIndex: 2 },
                                3: { value: 555 },
                                4: { value: 155, valueSourceIndex: 1 },
                                5: { value: 55, valueSourceIndex: 2 },
                            },
                            value: 'Azure'
                        }, {
                            level: 1,
                            values: {
                                0: { value: 330 },
                                1: { value: 133, valueSourceIndex: 1 },
                                2: { value: 31, valueSourceIndex: 2 },
                                3: { value: 335 },
                                4: { value: 135, valueSourceIndex: 1 },
                                5: { value: 35, valueSourceIndex: 2 },
                            },
                            value: 'Office'
                        }]
                },
                    {
                        level: 0,
                        value: 'Feb',
                        children: [
                            {
                                level: 1,
                                values: {
                                    0: { value: 40 },
                                    1: { value: 50, valueSourceIndex: 1 },
                                    2: { value: 60, valueSourceIndex: 2 },
                                    3: { value: 45 },
                                    4: { value: 55, valueSourceIndex: 1 },
                                    5: { value: 65, valueSourceIndex: 2 },
                                },
                                value: 'XBOX'
                            }, {
                                level: 1,
                                values: {
                                    0: { value: 770 },
                                    1: { value: 177, valueSourceIndex: 1 },
                                    2: { value: 71, valueSourceIndex: 2 },
                                    3: { value: 775 },
                                    4: { value: 175, valueSourceIndex: 1 },
                                    5: { value: 75, valueSourceIndex: 2 },
                                },
                                value: 'Azure'
                            }, {
                                level: 1,
                                values: {
                                    0: { value: 440 },
                                    1: { value: 144, valueSourceIndex: 1 },
                                    2: { value: 41, valueSourceIndex: 2 },
                                    3: { value: 445 },
                                    4: { value: 145, valueSourceIndex: 1 },
                                    5: { value: 45, valueSourceIndex: 2 },
                                },
                                value: 'Office'
                            }]
                    }]
            },
            levels: [{ sources: [playSource] }, { sources: [categorySource] }]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Series1",
                        children: [
                            { level: 1 },
                            { level: 1, levelSourceIndex: 1 },
                            { level: 1, levelSourceIndex: 2 }
                        ]
                    },
                    {
                        level: 0,
                        value: "Series2",
                        children: [
                            { level: 1 },
                            { level: 1, levelSourceIndex: 1 },
                            { level: 1, levelSourceIndex: 2 }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [seriesSource] },
                { sources: [measureSource1, measureSource2, measureSource3] }
            ]
        },
        valueSources: [measureSource1, measureSource2, measureSource3]
    };
    //let matrixSeriesAndCategoryAndPlayDataView: powerbi.DataView = {
    //    metadata: { columns: [categorySource, seriesSource, playSource, measureSource1, measureSource2, measureSource3] },
    //    matrix: matrixSeriesAndCategoryAndPlay
    //};

    describe("PlayChart", () => {
        it("convertMatrixToCategorical - Play", () => {
            let categoricalA = PlayChart.convertMatrixToCategorical(matrixPlay, 0);
            let categoricalB = PlayChart.convertMatrixToCategorical(matrixPlay, 1);

            expect(categoricalA.categories.length).toBe(0);
            expect(categoricalB.categories.length).toBe(0);
            expect(categoricalA.values.length).toBe(0);
            expect(categoricalB.values.length).toBe(0);
        });

        it("convertMatrixToCategorical - Series and Play", () => {
            let categoricalA = PlayChart.convertMatrixToCategorical(matrixSeriesAndPlay, 0);
            let categoricalB = PlayChart.convertMatrixToCategorical(matrixSeriesAndPlay, 1);

            expect(categoricalA.categories).toBeUndefined();
            expect(categoricalB.categories).toBeUndefined();
            expect(categoricalA.values.length).toBe(6);
            expect(categoricalB.values.length).toBe(6);
            for (let values of categoricalA.values) {
                expect(values.values.length).toBe(1);
            }
            for (let values of categoricalB.values) {
                expect(values.values.length).toBe(1);
            }
        });

        it("convertMatrixToCategorical - Category and Play", () => {
            let categoricalA = PlayChart.convertMatrixToCategorical(matrixCategoryAndPlay, 0);
            let categoricalB = PlayChart.convertMatrixToCategorical(matrixCategoryAndPlay, 1);

            expect(categoricalA.categories.length).toBe(1);
            expect(categoricalB.categories.length).toBe(1);
            expect(categoricalA.categories[0].values.length).toBe(3);
            expect(categoricalB.categories[0].values.length).toBe(3);
            expect(categoricalA.values.length).toBe(3);
            expect(categoricalB.values.length).toBe(3);
            for (let values of categoricalA.values) {
                expect(values.values.length).toBe(3);
            }
            for (let values of categoricalB.values) {
                expect(values.values.length).toBe(3);
            }
        });

        it("convertMatrixToCategorical - Series and Category and Play", () => {
            let categoricalA = PlayChart.convertMatrixToCategorical(matrixSeriesAndCategoryAndPlay, 0);
            let categoricalB = PlayChart.convertMatrixToCategorical(matrixSeriesAndCategoryAndPlay, 1);

            expect(categoricalA.categories.length).toBe(1);
            expect(categoricalB.categories.length).toBe(1);
            expect(categoricalA.categories[0].values.length).toBe(3);
            expect(categoricalB.categories[0].values.length).toBe(3);
            expect(categoricalA.values.length).toBe(6);
            expect(categoricalB.values.length).toBe(6);
            for (let values of categoricalA.values) {
                expect(values.values.length).toBe(3);
            }
            for (let values of categoricalB.values) {
                expect(values.values.length).toBe(3);
            }
        });

        // TODO: Two measures (X/Y no size, others... encouncentered while building the visual)
        // TODO: One measure (X or Y or size)
        // TODO: Zero measures, can still play through the frame names
    });
}